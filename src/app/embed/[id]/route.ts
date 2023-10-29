import { useUserServerNoExpiration } from '@/hooks/useUserServer';
import { appRouter } from '@/server';
import { PublicProduct } from '@/server/service/products';

function htmlEscape(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

const template = (product: PublicProduct, isLoggedIn: boolean) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/embed.css" />
    <title>2Pay - ${htmlEscape(product.name)}</title>
  </head>
  <body>
    <section class="min-h-screen bg-gradient-to-r from-[#00a54d20] to-secondary flex flex-col items-center py-10">
      <div class="flex flex-row items-center grow">
        <div class="flex flex-row max-md:flex-col max-md:items-center px-10 gap-10 mt-8">
          <img src="${htmlEscape(
            product.pictureURL
          )}" class="rounded-xl max-w-[400px] max-sm:w-full aspect-square cursor-pointer" />
          <div class="flex flex-col text-left justify-between max-w-3xl">
            <div class="flex flex-col gap-2 text-left">
              <div class="flex flex-row gap-4 items-center">
                <p class="text-5xl w-fit">${htmlEscape(product.name)}</p>
                <span class="py-0.5 px-1.5 rounded pb-1 border border-base-content flex flex-col">
                  <p class="text-[0.85rem] mt-1 mx-auto leading-3">Sold:</p>
                  <p class="text-[1.75rem] pt-1 mb-1 font-extrabold mx-auto leading-5 text-accent">
                  ${htmlEscape(product.amountSold.toString())}
                  </p>
                </span>
              </div>
              <p class="text-xl text-gray-400">${htmlEscape(product.description)}</p>
            </div>
            <div class="flex flex-row gap-4 items-center max-md:justify-between mb-5 mt-5">
              <p class="text-3xl text-accent">${htmlEscape(product.price.toFixed(2))}€</p>
              <div class="flex flex-row gap-3">
                <a
                  class="text-2xl bg-accent w-fit text-white px-10 pt-1 pb-2 rounded-lg select-none cursor-pointer hover:brightness-90"
                  href="${process.env.NEXT_PUBLIC_APP_URL}products/${product.uuid}"
                >
                  Buy EUR
                </a>
                <a
                  class="text-2xl bg-yellow-500 w-fit text-white px-10 pt-1 pb-2 rounded-lg select-none cursor-pointer hover:brightness-90"
                  href="${process.env.NEXT_PUBLIC_APP_URL}products/${product.uuid}"
                >
                  Buy ETH
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </body>
</html>
`;

export async function GET(req: Request) {
  const pathParts = req.url!.split('/').slice(-2) as string[];
  const productId = pathParts[1].trim().length > 0 ? pathParts[1] : pathParts[0];

  const caller = appRouter.createCaller({ rawToken: null, tokenData: null });
  const user = useUserServerNoExpiration();

  let product: PublicProduct;
  try {
    const productResult = await caller.product.get({ id: productId });
    if (productResult == null) throw new Error('Product is not found!');

    product = productResult;
  } catch (error) {
    return new Response('Product not found!', { status: 404 });
  }

  return new Response(template(product, user != null), {
    status: 200,
    headers: {
      'Content-Type': 'text/html'
    }
  });
}

