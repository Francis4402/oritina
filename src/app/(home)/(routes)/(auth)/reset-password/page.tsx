import ResetPasswordForm from "../authforms/reset-passform"



const ResetPassword = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="w-full max-w-sm md:max-w-3xl">
        <ResetPasswordForm />
      </div>
    </div>
  )
}

export default ResetPassword