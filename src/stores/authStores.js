// // import { auth, db } from '../config/firebase'
// import { defineStore } from 'pinia'
// import { reactive, ref } from 'vue'
// // import {
// //   createUserWithEmailAndPassword,
// //   onAuthStateChanged,
// //   signOut,
// //   signInWithEmailAndPassword
// // } from 'firebase/auth'
// // import { addDoc, collection, query, where, getDocs } from 'firebase/firestore'
// import { useRouter } from 'vue-router'

// // export const useAuthStores = defineStore('Auth', () => {
// //   const formInput = ref(false)
// //   const router = useRouter()

// //   const currentUser = ref(null)

// //   const userCollection = collection(db, 'users')

// //   const user = reactive({
// //     name: '',
// //     email: '',
// //     password: ''
// //   })

// //validation error
// const isError = ref(false)
// const message = ref(null)

// const userHandler = () => {
//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const queryId = query(userCollection, where('uid', '==', user.uid))

//       const queryData = await getDocs(queryId)
//       const queryUser = queryData.docs[0].data()

//       currentUser.value = {}
//       currentUser.value.email = user.email
//       currentUser.value.id = user.uid
//       currentUser.value.name = queryUser.name
//       currentUser.value.isAdmin = queryUser.isAdmin
//     } else {
//       currentUser.value = null
//     }
//   })
// }
// userHandler()

// const logoutUser = () => {
//   signOut(auth)
//     .then(() => {
//       router.push({ name: 'Login' })
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }

// const authUser = async (isLogin = false) => {
//   try {
//     isError.value = false
//     message.value = null
//     if (isLogin) {
//       await signInWithEmailAndPassword(auth, user.email, user.password)
//     } else {
//       const data = await createUserWithEmailAndPassword(auth, user.email, user.password)

//       await addDoc(userCollection, {
//         name: user.name,
//         isAdmin: false,
//         uid: data.user.uid
//       })
//     }
//   } catch (error) {
//     isError.value = true
//     message.value = error.message
//   }

//   user.email = ''
//   user.name = ''
//   user.password = ''
//   if (!isError.value) {
//     router.push({ name: 'Home' })
//   }
// }
// // return { formInput, user, authUser, userHandler, currentUser, logoutUser, isError, message }
// // })
