import { zodResolver } from '@hookform/resolvers/zod'
import { Envelope, Lock, Person } from '@phosphor-icons/react'
import { enqueueSnackbar } from 'notistack'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Input } from '../components/Input'
import { api } from '../lib/axios'

const Register = () => {
  const navigate = useNavigate()

  const handleLogin = (credentials: any) => {
    api
      .post('clients', {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      })
      .then((response) => {
        enqueueSnackbar(
          `Usuário ${response.data.name} cadastrado com sucesso`,
          {
            variant: 'success',
          },
        )
        navigate('/login')
      })
      .catch(() => {
        enqueueSnackbar('Erro ao registrar, tente novamente mais tarde', {
          variant: 'error',
        })
      })
  }

  const createPersonFormSchema = z.object({
    email: z
      .string()
      .nonempty('O email é obrigatório')
      .email('Formato de e-mail invalido'),
    password: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(6, 'A senha precisa ter, no mínimo 6 caracteres'),
    name: z
      .string()
      .nonempty('O nome é obrigatório')
      .min(2, 'A nome precisa ter, no mínimo, 2 caracteres'),
  })

  const loginForm = useForm({ resolver: zodResolver(createPersonFormSchema) })

  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = loginForm

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-200">
      <main className="h-3/4 w-1/3 bg-white p-10 justify-evenly items-center flex flex-col rounded-md shadow-md">
        <div className="h-20 w-full flex justify-center items-center -mt-3">
          <h1 className="text-4xl text-primary_color font-bold">TESTE</h1>
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          onChange={() => {
            clearErrors()
          }}
          autoComplete="off"
          className="flex flex-col gap-2"
        >
          <FormProvider {...loginForm}>
            <Input.Root
              id="name"
              patternColor="background_color"
              initialVisibility={false}
            >
              <Input.Icon icon={<Person color="gray" size={20} />} />
              <Input.Text placeholder="Nome" />
              <Input.Action />
            </Input.Root>
            {errors.name ? (
              <span
                aria-label={
                  'O campo nome possui uma inconsistencia, por favor, verifique: ' +
                  errors!.name!.message?.toString()
                }
                className="h-5 text-xs text-red-500 pl-2"
              >
                {errors!.name!.message?.toString()}
              </span>
            ) : (
              <div className="h-5"> </div>
            )}
            <Input.Root
              id="email"
              patternColor="background_color"
              initialVisibility={false}
            >
              <Input.Icon icon={<Envelope color="gray" size={20} />} />
              <Input.Text placeholder="Email" />
              <Input.Action />
            </Input.Root>
            {errors.email ? (
              <span
                aria-label={
                  'O campo email possui uma inconsistencia, por favor, verifique: ' +
                  errors!.email!.message?.toString()
                }
                className="h-5 text-xs text-red-500 pl-2"
              >
                {errors!.email!.message?.toString()}
              </span>
            ) : (
              <div className="h-5"> </div>
            )}
            <Input.Root id="password" patternColor="background_color">
              <Input.Icon icon={<Lock color="gray" size={20} />} />
              <Input.Text placeholder="Password" />
              <Input.ActionPassword />
            </Input.Root>
            {errors.password ? (
              <span
                aria-label={
                  'O campo senha possui uma inconsistencia, por favor, verifique: ' +
                  errors!.password!.message?.toString()
                }
                className="h-5 text-xs text-red-500 pl-2"
              >
                {errors!.password!.message?.toString()}
              </span>
            ) : (
              <div className="h-5"> </div>
            )}
            <button
              aria-label="Confirmar Login"
              type="submit"
              className="w-full p-2 cursor-pointer flex items-center bg-primary_color border-primary_color rounded-md text-secundary_color justify-center"
            >
              Registrar
            </button>
            <Link
              className="h-8 w-auto p-2 flex cursor-pointer text-xs self-center"
              to={'/login'}
            >
              Login
            </Link>
          </FormProvider>
        </form>
      </main>
    </div>
  )
}

export default Register
