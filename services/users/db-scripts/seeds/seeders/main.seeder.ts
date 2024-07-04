import { AppDataSource } from "../../../src/data-source";
import UserEntity from "../../../src/infrastructure/data/typeorm/entities/user.entity";
import { seedUsers } from "./user.seeder";

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    const userEntityRepository = AppDataSource.getRepository(UserEntity);
    await userEntityRepository.clear();

    await seedUsers(userEntityRepository);
  } finally {
    await AppDataSource.destroy();
  }
};

seedDatabase()
  .then(() => console.log("Database seeded successfully"))
  .catch((e) => console.error("Error seeding database:", e));
