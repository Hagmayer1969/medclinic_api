import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

// Perfis de acesso disponiveis no sistema
export enum UserRole {
  ADMINISTRADOR = "Administrador",
  ATENDENTE = "Atendente",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email!: string;

  // Guarda apenas o hash da senha, nunca o texto puro
  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.ATENDENTE })
  role!: UserRole;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
