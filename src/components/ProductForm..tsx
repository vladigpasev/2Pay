'use client';

import { useSetTokens } from '@/auth/token';
import { CustomForm, Field } from '@/components/utils/Form';
import { NotificationType, useDispatchNotification } from '@/components/utils/Notifyers';
import { UploadButton } from '@/components/utils/Uoloader';
import { useAuthenticatedMutation } from '@/hooks/useAuthenticatedMutation';
import { trpc } from '@/trpc/client';
import { isValidEmail } from '@/utils/isValidEmail';
import { faAdd, faCamera, faTrash } from '@fortawesome/free-solid-svg-icons';
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

export function GalleryUpload({
  onUploadComplete,
  onDelete,
  imgUrl
}: {
  onUploadComplete: (res?: UploadFileResponse[] | undefined) => void;
  onDelete: () => void;
  imgUrl: string;
}) {
  const dispatchNotification = useDispatchNotification();

  return (
    <div className='flex relative flex-col justify-center h-full items-center rounded-xl p-5 bg-secondary cursor-pointer w-fit max-w-[30%] max-md:max-w-[45%] max-sm:max-w-full'>
      <img src={imgUrl || '/images/pngs/product.png'} alt='uploaded image' className='w-full aspect-square w-ful' />
      <UploadButton
        endpoint='imageUpload'
        className='mt-2'
        onClientUploadComplete={onUploadComplete}
        onUploadError={(error: Error) => {
          // Do something with the error.
          dispatchNotification({
            type: NotificationType.Error,
            message: error.message || 'Upload Failed'
          });
        }}
        content={{
          button: (
            <a className='flex mx-auto link cursor-pointer text-sm px-3 font-semibold gap-2'>
              Set Image <FontAwesomeIcon icon={faCamera} className='my-auto' />
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
      <span className='cursor-pointer absolute top-2 right-2 rounded bg-base-300 px-1.5' onClick={() => onDelete()}>
        <FontAwesomeIcon icon={faTrash} color='red' />
      </span>
    </div>
  );
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

  const [galleryImageURLs, setGalleryImageURLs] = useState<string[]>(product?.galleryJSON || []);

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
          galleryJSON: galleryImageURLs
        });
      } else {
        res = await updateProductAsyncMutation({
          name: data.name,
          description: data.description,
          id: id!,
          price: data.price,
          pictureURL: logoURL,
          galleryJSON: galleryImageURLs
        });
      }
      router.push(`/companies/${companyUuid}`);
    } catch (error: any) {
      dispatchNotification({
        type: NotificationType.Error,
        message: error.message
      });

      return null;
    }
  };

  const uploadToGallery = (res: UploadFileResponse[] | undefined, i: number) => {
    if (!res) {
      return;
    }
    setGalleryImageURLs(galleryImageURLs => {
      galleryImageURLs[i] = res[0].url;
      return [...galleryImageURLs];
    });
    return null;
  };

  const deleteGalleryUpload = (i: number) => {
    setGalleryImageURLs(galleryImageURLs.filter((url, index) => i != index));
  };

  useEffect(() => {
    if (type === 'update') {
      setLogoURL(product?.pictureURL || '/images/pngs/product.png');
    }
  }, []);

  return (
    <div className='min-h-[calc(100vh-90px)] w-full flex justify-center items-center my-5 max-sm:my-0'>
      <div className='sm:shadow-xl px-12 py-12 bg-base-200 rounded-xl max-w-4xl items-center'>
        <h1 className='font-semibold text-3xl text-start mb-4'>
          {type === 'create' ? 'Create' : 'Update'} a <strong>Product</strong>
        </h1>
        <div className='flex gap-5 flex-row max-md:flex-col mx-auto w-fit'>
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
                    router.push(`/companies/${companyUuid}`);
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
        <div className='bg-neutral rounded-xl w-full p-8 pt-4 max-sm:p-3 mt-3 max-w-full'>
          <h3 className='font-semibold text-2xl'>Product Images - Gallery</h3>
          <div className='flex flex-wrap flex-row max-sm:flex-col mt-4 gap-3 items-center'>
            {galleryImageURLs.map((v, i) => (
              <GalleryUpload
                imgUrl={v}
                onDelete={() => deleteGalleryUpload(i)}
                onUploadComplete={res => uploadToGallery(res, i)}
                key={i}
              />
            ))}
            <div
              className='flex aspect-square min-h-full justify-center items-center rounded-xl p-5 bg-secondary cursor-pointer'
              onClick={() => {
                setGalleryImageURLs([...galleryImageURLs, '']);
              }}
            >
              <h3 className='text-xl font-semibold'>
                <FontAwesomeIcon icon={faAdd} /> Add Image
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
