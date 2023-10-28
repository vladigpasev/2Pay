import ProductForm from '@/components/ProductForm.';

export default function CreateProduct({ params }: { params: { companyId: string } }) {
  return <ProductForm type='create' companyUuid={params.companyId} />;
}
