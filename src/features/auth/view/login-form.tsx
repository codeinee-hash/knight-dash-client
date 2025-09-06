import { Button } from '@/shared/ui/kit/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/kit/form';
import { Input } from '@/shared/ui/kit/input';
import { IMaskInput } from 'react-imask';
import { useLogin } from '../model/use-login';

export function LoginForm() {
  const { form, onSubmit, isPending } = useLogin();

  return (
    <Form {...form}>
      <form
        className='w-full flex flex-col items-center gap-[15px]'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-base leading-[100%] font-medium text-white mb-2'>
                Имя:
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='RenamedUser_228'
                  {...field}
                  className='h-[55px] rounded-md bg-[#24262d] text-white placeholder:text-gray-400 px-2! text-base border border-gray-700 focus:outline focus:outline-[#f5d91f]'
                />
              </FormControl>
              <FormMessage className='text-[#fb2c36] text-sm' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='telephone'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-base leading-[100%] font-medium text-white mb-2'>
                Телефон:
              </FormLabel>
              <FormControl>
                <IMaskInput
                  {...field}
                  mask='+{996} 000 000 000'
                  lazy={false}
                  placeholderChar='_'
                  overwrite={true}
                  onAccept={(_, mask) => field.onChange(mask.unmaskedValue)}
                  value={field.value}
                  placeholder='+996 ___ ___ ___'
                  type='text'
                  inputMode='numeric'
                  className='h-[55px] rounded-md bg-[#24262d] text-white placeholder:text-gray-400 px-2! text-base border border-gray-700 focus:outline focus:outline-[#f5d91f]'
                />
              </FormControl>
              <FormMessage className='text-[#fb2c36] text-sm' />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type='submit'
          className='w-full mt-4 h-[44px] rounded-[10px] bg-[#f5d91f] text-[#2C2E35] font-medium text-base hover:bg-[#f0b700] transition-colors duration-200'
        >
          Войти
        </Button>
      </form>
    </Form>
  );
}
