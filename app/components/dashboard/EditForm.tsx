'use client';
import { editProduct } from '@/app/actions';
import { UploadDropzone } from '@/app/lib/uploadthing';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@conform-to/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, XIcon } from 'lucide-react';
import Link from 'next/link';
// import { useFormState } from 'react-dom';
import { parseWithZod } from '@conform-to/zod';
import { productSchema } from '@/app/lib/zodSchemas';
import { useState, useActionState } from 'react';
import Image from 'next/image';
import { categories } from '@/app/lib/categories';
import { SubmitButton } from '@/app/components/SubmitButtons';
import { $Enums } from '@/lib/generated/prisma';
// import { type $Enums } from '@prisma/client';

// import { $Enums } from '@/lib/generated/prisma';

interface iAppProps {
  data: {
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
    id: string;
  };
}

export function EditForm({ data }: iAppProps) {
  const [images, setImages] = useState<string[]>(data.images);
  const [lastResult, action] = useActionState(editProduct, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },

    shouldRevalidate: 'onBlur',
    shouldValidate: 'onInput',
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="productId" value={data.id} />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            {' '}
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-medium tracking-tight">Edit Product</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>in this form you can update your product</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                type="text"
                className="w-full"
                placeholder="product name"
              />

              <p className="text-red-300">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col  gap-3">
              <label>Description</label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
                placeholder="write your description right here......."
              />

              <p className="text-red-300">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <label>Price</label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={data.price}
                type="number"
                placeholder="$555"
                min={1}
                step={1}
                inputMode="numeric"
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
                }}
              />

              <p className="text-red-300">{fields.price.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultChecked={data.isFeatured}
              />

              <p className="text-red-300">{fields.isFeatured.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select key={fields.status.key} name={fields.status.name} defaultValue={data.status}>
                <SelectTrigger>
                  <SelectValue placeholder="select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-red-300">{fields.status.errors}</p>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={data.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-300">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((images, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={images}
                        alt="product image"
                        className="w-full h-full object-cover rounded-lg border"
                      />

                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert('Something went wrong');
                  }}
                />
              )}

              <p className="text-red-300">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          {/* <Button>Create product</Button> */}
          <SubmitButton text="Edit Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
