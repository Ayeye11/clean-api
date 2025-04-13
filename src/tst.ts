import { AuthenticateUseCase } from "@application/use-case";
import { UserIdentifierModel } from "@infrastructure/database/models";
import { UserRepositoryImpl } from "@infrastructure/database/repository";
import {
  BcryptService,
  Database,
  JwtService,
  UuidService,
} from "@infrastructure/services";
import express from "express";

const main = async () => {
  try {
    const db = Database.getInstance();
    await db.initialize();

    const repo = new UserRepositoryImpl(db.getRepository(UserIdentifierModel));
    const idSvc = new UuidService();
    const hashSvc = new BcryptService();
    const tokenSvc = new JwtService("secretKey");

    const useCase = new AuthenticateUseCase(repo, idSvc, hashSvc, tokenSvc);

    const app = express();
    app.get("/api/auth/register", (req, res, next) => {
      res.status(201).json({ message: "allok " });
    });

    app.listen(3000, () => console.log("server up"));
  } catch (err) {
    console.error(err);
  }
};
main();
