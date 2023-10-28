import { InferInsertModel, InferSelectModel, and, eq, sql } from 'drizzle-orm';
import { companies } from '../../../db/schema';
import IUser from '@/types/User';
import * as uuid from 'uuid';
import db from '@/drizzle';

export interface CompanyInfo {
  name: string;
  contactEmail: string;
  description: string;
  logoURL: string | null;
}

export type Company = InferSelectModel<typeof companies>;

async function createCompany(userInfo: IUser, companyInfo: CompanyInfo) {
  const company: InferInsertModel<typeof companies> = {
    uuid: uuid.v4(),
    ...companyInfo,
    creatorUuid: userInfo.uuid
  };

  await db.insert(companies).values(company);

  return company;
}

async function getCompany(companyId: string) {
  const records = await db.select().from(companies).where(eq(companies.uuid, companyId)).limit(1);
  if (records.length == 0) return null;
  return records[0];
}

async function updateCompany(userInfo: IUser, companyId: string, newCompanyInfo: CompanyInfo) {
  console.log(newCompanyInfo.name);
  const updateOperation = await db
    .update(companies)
    .set(newCompanyInfo)
    .where(and(eq(companies.uuid, companyId), eq(companies.creatorUuid, userInfo.uuid)));

  console.log(updateOperation);

  if (updateOperation.rowsAffected === 0) return null;

  return {
    uuid: companyId,
    ...newCompanyInfo,
    creatorUuid: userInfo.uuid
  };
}

async function deleteCompany(userInfo: IUser, companyId: string) {
  const deleteOperation = await db
    .delete(companies)
    .where(and(eq(companies.uuid, companyId), eq(companies.creatorUuid, userInfo.uuid)));

  return deleteOperation.rowsAffected > 0;
}

function getCompaniesOfUser(userUuid: string) {
  return db.select().from(companies).where(eq(companies.creatorUuid, userUuid));
}

async function findCompanies(search: string) {
  return (
    await db.execute(sql`
    SELECT * FROM ${companies}
    WHERE
      LOWER(${companies.name}) LIKE ${'%' + search.toLowerCase() + '%'} OR
      LOWER(${companies.description}) LIKE ${'%' + search.toLowerCase() + '%'} OR
      MATCH (${companies.name}, ${companies.description})
      AGAINST (${search} IN NATURAL LANGUAGE MODE)
  `)
  ).rows as InferSelectModel<typeof companies>[];
}

export { createCompany, getCompany, updateCompany, deleteCompany, getCompaniesOfUser, findCompanies };
