import React from 'react'

const ErrorPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <div className="text-center">
                    <p className="text-4xl font-bold mb-4">Oh you have not cracked the previous levels</p>
                    <p className="text-2xl font-bold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-900 to-blue-500">Keep playing and try to crack the levels to unlock more fun!</span> 
                    </p>
                </div>
     </div>
  )
}

export default ErrorPage