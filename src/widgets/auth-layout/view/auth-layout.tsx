import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/kit/card';

export function AuthLayout({
  title,
  form,
  footerText,
}: {
  title: string;
  form: React.ReactNode;
  footerText: React.ReactNode;
}) {
  return (
    <div className='flex justify-center items-center min-h-screen container mx-auto! max-sm:px-[20px]!'>
      <Card className='w-[500px] rounded-lg bg-[#393939] border-none px-[77px]! pt-12! pb-9! max-sm:px-[20px]!'>
        <CardHeader>
          <CardTitle className='text-white text-center text-3xl mb-[15px]!'>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className='px-[50px] py-[80px]'>{form}</CardContent>
        <CardFooter className='flex justify-center'>
          <p className='text-muted-foreground [&_a]:underline [&_a]:text-[##F5D91F] leading-[100%]'>
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
