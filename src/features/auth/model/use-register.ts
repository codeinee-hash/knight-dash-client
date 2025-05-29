import { ROUTES } from '@/shared/utils/consts/consts'
import { useSession } from '@/shared/model/use-session'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { AuthData } from './types'
import { $mainApi } from '@/shared/api/axios'

export function useRegister() {
	const navigate = useNavigate()
	const login = useSession(s => s.login)

	const registerMutation = useMutation({
		mutationFn: async (reqData: AuthData) => {
			const { data } = await $mainApi.post('auth/sign-up', reqData)
			return data
		},
		onSuccess(data) {
			login(data.access_token)
			navigate(ROUTES.HOME)
		},
		onError(error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data?.message || 'Ошибка при регистрации')
			}
		},
	})

	const register = (data: AuthData) => {
		registerMutation.mutate(data)
	}

	return {
		register,
		isPending: registerMutation.isPending,
	}
}