import { InferInsertModel, InferSelectModel, and, eq, sql } from 'drizzle-orm';
import { companies, products } from '../../../db/schema';
import IUser from '@/types/User';
import * as uuid from 'uuid';
import db from '@/drizzle';

export type Company = InferSelectModel<typeof companies>;

export type PublicCompany = Omit<Company, 'revenue'>;

export type ListedCompany = PublicCompany;

export type CompanyInfo = Omit<PublicCompany, 'uuid' | 'creatorUuid' | 'soldItems'>;

const LISTED_COMPANY_FIELDS_DB = {
  uuid: companies.uuid,
  name: companies.name,
  description: companies.description,
  contactEmail: companies.contactEmail,
  logoURL: companies.logoURL,
  creatorUuid: companies.creatorUuid,
  soldItems: companies.soldItems
};

async function createCompany(userInfo: IUser, companyInfo: CompanyInfo) {
  const company: InferInsertModel<typeof companies> = {
    uuid: uuid.v4(),
    ...companyInfo,
    soldItems: 0,
    revenue: 0,
    creatorUuid: userInfo.uuid
  };

  await db.insert(companies).values(company);

  return company;
}

async function getCompany(companyId: string) {
  const records = await db.select().from(companies).where(eq(companies.uuid, companyId)).limit(1);
  if (records.length == 0) return null;

  const company = records[0];

  // @ts-ignore
  delete company.revenue;

  return company as PublicCompany;
}

async function getCompanyRevenue(userInfo: IUser, companyId: string) {
  const company = (
    await db
      .select()
      .from(companies)
      .where(and(eq(companies.uuid, companyId), eq(companies.creatorUuid, userInfo.uuid)))
      .limit(1)
  )[0];

  if (company == null) throw new Error('You do not own this company!');

  return company.revenue;
}

async function updateCompany(userInfo: IUser, companyId: string, newCompanyInfo: CompanyInfo) {
  const company = (
    await db
      .select()
      .from(companies)
      .where(and(eq(companies.uuid, companyId), eq(companies.creatorUuid, userInfo.uuid)))
      .limit(1)
  )[0];

  if (company == null) throw new Error('You do not own this company!');

  const updateOperation = await db.update(products).set(newCompanyInfo).where(eq(companies.uuid, companyId));

  if (updateOperation.rowsAffected === 0) throw new Error('Something went wrong!');

  const newCompany = {
    ...company,
    ...newCompanyInfo
  };

  // @ts-ignore
  delete newCompany.revenue;

  return newCompany as PublicCompany;
}

async function deleteCompany(userInfo: IUser, companyId: string) {
  const deleteOperation = await db
    .delete(companies)
    .where(and(eq(companies.uuid, companyId), eq(companies.creatorUuid, userInfo.uuid)));

  if (deleteOperation.rowsAffected === 0) return false;

  await db.delete(products).where(eq(products.companyUuid, companyId));

  return true;
}

async function getCompaniesOfUser(userUuid: string) {
  return await db.select(LISTED_COMPANY_FIELDS_DB).from(companies).where(eq(companies.creatorUuid, userUuid));
}

async function findCompanies(search: string) {
  // prettier-ignore
  return (
    await db.execute(sql`
    SELECT ${companies.uuid}, ${companies.name}, ${companies.description}, ${companies.contactEmail}, ${companies.logoURL}, ${companies.creatorUuid}, ${companies.soldItems} FROM ${companies}
    WHERE
      LOWER(${companies.name}) LIKE ${'%' + search.toLowerCase() + '%'} OR
      LOWER(${companies.description}) LIKE ${'%' + search.toLowerCase() + '%'} OR
      MATCH (${companies.name}, ${companies.description})
      AGAINST (${search} IN NATURAL LANGUAGE MODE)
  `)
  ).rows as InferSelectModel<typeof companies>[];
}

export {
  createCompany,
  getCompany,
  getCompanyRevenue,
  updateCompany,
  deleteCompany,
  getCompaniesOfUser,
  findCompanies
};

