import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Cleanup existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.menuItem.deleteMany()
    await prisma.category.deleteMany()
    await prisma.reservation.deleteMany()
    await prisma.admin.deleteMany()

    // Create Admin
    // Password: admin (in a real app, hash this!)
    await prisma.admin.create({
        data: {
            username: 'admin',
            password: 'admin',
        },
    })

    // Create Categories
    const coffee = await prisma.category.create({
        data: {
            name: 'Coffee',
            slug: 'coffee',
        },
    })

    const pastries = await prisma.category.create({
        data: {
            name: 'Pastries',
            slug: 'pastries',
        },
    })

    const breakfast = await prisma.category.create({
        data: {
            name: 'Breakfast',
            slug: 'breakfast',
        },
    })

    // Create Menu Items
    await prisma.menuItem.createMany({
        data: [
            {
                name: 'Espresso',
                description: 'Rich and bold single shot espresso',
                price: 3.50,
                categoryId: coffee.id,
                image: '/images/espresso.jpg',
            },
            {
                name: 'Cappuccino',
                description: 'Espresso with steamed milk and foam',
                price: 4.50,
                categoryId: coffee.id,
                image: '/images/cappuccino.jpg',
            },
            {
                name: 'Latte',
                description: 'Espresso with steamed milk',
                price: 4.75,
                categoryId: coffee.id,
                image: '/images/latte.jpg',
            },
            {
                name: 'Croissant',
                description: 'Buttery and flaky french pastry',
                price: 3.00,
                categoryId: pastries.id,
                image: '/images/croissant.jpg',
            },
            {
                name: 'Blueberry Muffin',
                description: 'Freshly baked muffin with blueberries',
                price: 3.25,
                categoryId: pastries.id,
                image: '/images/muffin.jpg',
            },
            {
                name: 'Avocado Toast',
                description: 'Sourdough toast with smashed avocado and chili flakes',
                price: 8.50,
                categoryId: breakfast.id,
                image: '/images/avocado-toast.jpg',
            },
        ],
    })

    console.log('Seed data created successfully')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
