import ResetPasswordForm from "../authforms/reset-passform"



const ResetPassword = () => {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div className="w-full max-w-sm md:max-w-xl">
        <ResetPasswordForm />
      </div>
    </div>
  )
}

export default ResetPassword