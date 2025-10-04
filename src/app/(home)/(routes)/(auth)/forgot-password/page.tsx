import ForgotPasswordForm from '../authforms/forgot-passform'

const ForgotPassword = () => {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div className="w-full max-w-sm md:max-w-xl">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

export default ForgotPassword