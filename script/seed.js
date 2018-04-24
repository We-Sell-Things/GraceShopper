/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Category} = require('../server/db/models')
const {Review} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const categories = await Promise.all([
    Category.create({name: 'kitchen'}),
    Category.create({name: 'technology'}),
    Category.create({name: 'music'}),
    Category.create({name: 'nonsense'}),
    Category.create({name: 'food'}),
    Category.create({name: 'goodies'})
  ])

  const reviews = await Promise.all([
    Review.create({score: 4, review: 'it is tops', userId: 1}),
    Review.create({score: 5, review: '10/10 would buy', userId: 2})
  ])

  const products = await Promise.all([
    Product.create({title: 'Potato Bag Opener', quantity: '5', description: 'Opens potato bags easily so you dont have to!', price: '25', imgUrl: '/pics/bagopener.jpg', categoryId: '1'}),
    Product.create({title: 'Beer underwear', quantity: '5', description: 'Hide beer in your underwear easily!', price: '15', imgUrl: '/pics/beerunderwear.jpg', categoryId: '1'}),
    Product.create({title: 'Computer monitor cover', quantity: '5', description: 'When you want to not see the screen and not turn the screen off!', price: '52', imgUrl: '/pics/screencover.jpg', categoryId: '2'}),
    Product.create({title: 'Computer usb lamp', quantity: '5', description: 'For when you need extra brightness to your screen!', price: '2', imgUrl: '/pics/usblamp.jpg', categoryId: '2'}),
    Product.create({title: 'Beer warmer', quantity: '5', description: 'For when your beer is too cold and it needs to be warmed!', price: '52', imgUrl: '/pics/beerwarmer.jpg', categoryId: '3'}),

    Product.create({title: 'Pair of Egg Holders', quantity: '200', description: 'For when your eggs need to be held', price: '21', imgUrl: '/pics/eggholder.jpg', categoryId: '1'}),
    Product.create({title: 'Pool bbq', quantity: '51', description: 'For having bbqs in the pool!', price: '522', imgUrl: '/pics/bbqpool.jpg', categoryId: '5'}),
    Product.create({title: 'Cat butthole bling', quantity: '500', description: 'For jazzing up your cats romantic life', price: '10', imgUrl: '/pics/catbling.jpg', categoryId: '3'}),
    Product.create({title: 'Cover of original artwork', quantity: '50', description: 'Good artwork of shit', price: '100', imgUrl: '/pics/artwork.jpg', categoryId: '6'}),
    Product.create({title: 'Boomerang Gun', quantity: '50', description: 'Shoots boomerang', price: '10', imgUrl: '/pics/gun.jpg', categoryId: '6'})
  ])


  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
