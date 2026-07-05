// // src/features/auth/hooks/useLogin.ts

// import { useMutation } from '@tanstack/react-query'
// import type { LoginPayload, LoginResponse } from '../types'
// // import { login } from '../api' // TODO: enable when backend ready

// export function useLogin() {
//   return useMutation<LoginResponse, Error, LoginPayload>({
//     mutationFn: async (data) => {
//       // TODO: Replace with real API
//       return new Promise<LoginResponse>((resolve, reject) => {
//         setTimeout(() => {
//           if (data.username === 'admin' && data.password === 'password') {
//             resolve({
//               user: { id: '1', username: 'admin' },
//               token: 'mock-token',
//             })
//           } else {
//             reject(new Error('Invalid credentials'))
//           }
//         }, 1000)
//       })
//     },
//   })
// }