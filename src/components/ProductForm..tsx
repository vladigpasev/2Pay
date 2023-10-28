'use client';

import { useSetTokens } from '@/auth/token';
import { CustomForm, Field } from '@/components/utils/Form';
import { NotificationType, useDispatchNotification } from '@/components/utils/Notifyers';
import { UploadButton } from '@/components/utils/Uoloader';
import { useAuthenticatedMutation } from '@/hooks/useAuthenticatedMutation';
import { trpc } from '@/trpc/client';
import { isValidEmail } from '@/utils/isValidEmail';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { UploadFileResponse } from 'uploadthing/client';
import { useRouter } from 'next/navigation';
import { ProductInfo } from '@/server/service/products';

interface CreateproductFormData {
  name: string;
  price: number;
  description: string;
}

export default function ProductForm({
  type,
  product,
  companyUuid,
  id
}: {
  type: 'create' | 'update';
  product?: ProductInfo;
  companyUuid: string;
  id?: string;
}) {
  const CREATE_product_FIELDS: Field<any>[] = [
    {
      id: 'name',
      name: 'product Name',
      type: 'text',
      placeholder: 'Product Name',
      defaultValue: type === 'update' ? product?.name : undefined,
      validate: value => (value.trim().length >= 1 ? null : 'Product name is too short!')
    },
    {
      id: 'price',
      name: 'Price in €',
      type: 'number',
      placeholder: '10',
      defaultValue: type === 'update' ? product!.price.toString() : undefined,
      transform: value => parseFloat(value),
      validate: value => (value > 2 && value < 10000 ? null : 'Price shall be between 3€ and 10000€!')
    },
    {
      id: 'description',
      name: 'Description',
      type: 'longText',
      placeholder: 'A few words about hte prduct you are selling',
      defaultValue: type === 'update' ? product?.description : undefined,
      validate: value => (value.trim().length >= 5 ? null : 'Product description is too short!')
    }
  ];

  const dispatchNotification = useDispatchNotification();

  const [_, createProductAsyncMutation] = useAuthenticatedMutation(trpc.product.create);
  const [__, updateProductAsyncMutation] = useAuthenticatedMutation(trpc.product.update);
  const [___, deleteProductAsyncMutation] = useAuthenticatedMutation(trpc.product.delete);

  const [logoURL, setLogoURL] = useState('');

  const router = useRouter();

  const onSubmit = async (data: CreateproductFormData) => {
    if (!logoURL && type === 'create') {
      dispatchNotification({
        type: NotificationType.Error,
        message: 'Please upload product image first!'
      });
      return null;
    }
    try {
      let res = null;
      if (type === 'create') {
        res = await createProductAsyncMutation({
          name: data.name,
          description: data.description,
          companyUuid: companyUuid,
          price: data.price,
          pictureURL: logoURL,
          galleryJSON: []
        });
      } else {
        res = await updateProductAsyncMutation({
          name: data.name,
          description: data.description,
          id: id!,
          price: data.price,
          pictureURL: logoURL,
          galleryJSON: []
        });
      }
      router.push('/user/profile');
    } catch (error: any) {
      dispatchNotification({
        type: NotificationType.Error,
        message: error.message
      });

      return null;
    }
  };

  useEffect(() => {
    if (type === 'update') {
      setLogoURL(product?.pictureURL || '/images/pngs/product.png');
    }
  }, []);

  return (
    <div className='h-[calc(100vh-90px)] w-full flex justify-center items-center'>
      <div className='sm:shadow-xl px-12 py-12 sm:bg-base-200 rounded-xl'>
        <h1 className='font-semibold text-3xl text-start mb-4'>
          Create a <strong>Product</strong>
        </h1>
        <div className='flex gap-5 flex-row max-md:flex-col'>
          <div className='flex flex-col'>
            <img
              src={logoURL || '/images/pngs/product.png'}
              alt='user proifle'
              className='mx-auto rounded-md w-full max-w-[350px] aspect-square bg-cover'
            />
            <UploadButton
              endpoint='imageUpload'
              className='mt-2'
              onClientUploadComplete={async res => {
                const file = res![0];
                setLogoURL(file.url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                dispatchNotification({
                  type: NotificationType.Error,
                  message: error.message || 'Upload Failed'
                });
              }}
              content={{
                button: (
                  <a className='flex mx-auto link cursor-pointer font-semibold gap-2'>
                    Change Image <FontAwesomeIcon icon={faCamera} className='my-auto' />
                  </a>
                )
              }}
              appearance={{
                button: {
                  width: '100%',
                  maxWidth: '350px'
                }
              }}
            />
          </div>
          <div className='flex flex-col'>
            <CustomForm
              buttonText={type === 'create' ? 'Create Product' : 'Update Product'}
              fields={CREATE_product_FIELDS}
              canSubmit={true}
              error={null}
              onSubmit={onSubmit}
            />
            {type === 'update' && (
              <button
                className='btn btn-error font-semibold mt-2 rounded-sm'
                onClick={async () => {
                  try {
                    await deleteProductAsyncMutation({ id: id! });
                    router.push('/user/profile');
                  } catch (error: any) {
                    console.error(error);
                    dispatchNotification({
                      type: NotificationType.Error,
                      message: error.message
                    });

                    return null;
                  }
                }}
              >
                Delete Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
