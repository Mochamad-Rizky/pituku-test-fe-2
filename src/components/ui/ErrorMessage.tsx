type Props = {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="text-center mt-20">
      <h2 className="text-red-500 font-bold text-2xl">{message}</h2>
      <p className="text-gray-400">
        Silahkan coba lagi nanti
      </p>
    </div>
  )
}
