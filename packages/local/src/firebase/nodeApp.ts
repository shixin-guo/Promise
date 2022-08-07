import * as admin from 'firebase-admin'
if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.cert({
    //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    //   privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    // }),
    // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    credential: admin.credential.cert({
      projectId: 'test-d9e75',
      clientEmail: 'firebase-adminsdk-nqnfa@test-d9e75.iam.gserviceaccount.com',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDl+NirmSEbQOrp\nwLqlGD/3eikYHv2Yc+kCaiL7AjEtzABp7zjj/FMzWT5Jfv2vX84hCSY7Ma2NWuLe\nkNWYW2trwn0eN57oR/QvkXQr12BIVqHVMYytgdr6i4esBqQSLmPG9EbMtBIQDdqp\nRj1W+ESFeOtzDEjnHRibDcOmQCucF3e/3mXGaJkwbz0IXZV1/UV2bcfbLBh+oelv\ntCwDfCX9bgaS8pJ8ZhHMh5EW//ze4SYFSto/JkIzmj+KespbRffet8nTgfreNzKJ\n0ZOICJmAGFmh5EIdOZIsmyWJm27TdnP2avDNAv666xqIiQucHVWMNXevKohxCVfW\nq2BzozILAgMBAAECggEAMX+gUz8AazdL2MhM5CAWFJRMqA5zkw7Pxl9F7DUKlMrm\nA+cjnZ6/4buBtpwIymiam222tuL4cgZv8mvGLabvtiAEgi6Cm4hxPJPYJ1+SL7/F\n0Xd6yhW7JlZF+3bqdadafoYxfvn7MU1qFSkzJrcFOJ1QQFESl/whQa5ywCPrvwq9\nmo92n/Cg4CCJ0mbF4R4sHhH7KEykgzKL+XZOcUiv2Nafk6MnCrhvhMvXpt9bNumy\nXmej6sCA5xR04+tqYGMJ1KzHC1EhF19vexF6R8XL870NtBNGtpDqmejjyB0UIwLJ\n18BPSDXEsCIAIhkC8lv6+zyWm6Mm/hRpHWqNh2y14QKBgQD2tK6TNpbhWMmyn7WJ\ne5K4i/LRdKEe0Z3zjQrnfz6vIJQds+oZB0U2mmeuQyWbZuYmpj/Os33AW/nIFILY\nHX6FzdnL50kyy42ce2EA/H5BcHYyrvj3ubGbDYgDN4MxNh9RWRCH476ocfBXzNLx\n3T/cbTy6MCINRnJ6F/GpdcphWQKBgQDuosdESjdC4YerYqgdQeIgGCPBeZorOT8Q\n/7GCOm234Ohrtz0g5Wc7JEVWBSAkKKfkLunmhBCKIB9ux3Lp7tg17XeIGiuP6bXW\nw51yZl8MEHx8hA0tZAJ7QymuC1+PGVAUA30zEuqYdKHBrcn430wnSU0h9g3Xcj/q\nBDQEaaS+AwKBgGPoD7p2JOvlNOktXCrs7CHoKtE/1e/RG5IB0CSnlw78tn7A2VCB\nbToLlWkwsA4awaFtOfHPJmG73Y91Hve+Gfq9vjGg3DfBzvtLy6DGn6qIjJVB3nkT\nriUIecgztuE69bvPwa4GQLOeUKJ9w/9GhhIR+sG7tE6D9OAUyjzCAs8hAoGAPXt4\n5ZJNfJDIuJJZh/gyf1xY0f83hk1gf0uxe0D8hbSPjTkPqcsQ9r7YkloNtuM2pmaj\n4r1B2aR/FLaUV8sur244Lru3X4OyUtvhU9kmQeB5gkcvcfNjZEigk3Pgseiupglk\nF2WXRaI/Drxs3g8B+tk64zYWyNxptSxSDpT9WesCgYAr8FTwRvB0ds3QRs5635lp\nCVygR4dj9reZMHfs2bsA4o7U2P2rwJ2FgcT8mdD7dbAwBZquAyt0wf4ZJn6Q604K\nWUVKphaUsYnD8Y6iWXlSKbXU9my/fYOjvlSkkFClOPhoKI/+D3us9NctCsC2G9+Y\nOg+Pval28n7YuM6yP+QH0A==\n-----END PRIVATE KEY-----\n'!.replace(
          /\\n/g,
          '\n'
        ),
    }),
  })
}

export default admin
