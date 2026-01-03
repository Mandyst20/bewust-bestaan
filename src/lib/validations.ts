import { z } from "zod";

// Username validation: 3-30 chars, alphanumeric + underscore only
export const usernameSchema = z
  .string()
  .min(3, "Gebruikersnaam moet minimaal 3 karakters zijn")
  .max(30, "Gebruikersnaam mag maximaal 30 karakters zijn")
  .regex(/^[a-zA-Z0-9_]+$/, "Alleen letters, cijfers en underscores toegestaan");

// Bio validation: max 500 chars
export const bioSchema = z
  .string()
  .max(500, "Bio mag maximaal 500 karakters zijn")
  .optional();

// Email validation
export const emailSchema = z
  .string()
  .email("Ongeldig e-mailadres")
  .max(255, "E-mailadres te lang");

// Password validation: min 8 chars
export const passwordSchema = z
  .string()
  .min(8, "Wachtwoord moet minimaal 8 karakters zijn")
  .max(128, "Wachtwoord mag maximaal 128 karakters zijn");

// Topic validation
export const topicTitleSchema = z
  .string()
  .min(5, "Titel moet minimaal 5 karakters zijn")
  .max(200, "Titel mag maximaal 200 karakters zijn");

export const topicBodySchema = z
  .string()
  .min(10, "Bericht moet minimaal 10 karakters zijn")
  .max(10000, "Bericht mag maximaal 10.000 karakters zijn");

// Reply validation
export const replyBodySchema = z
  .string()
  .min(2, "Reactie moet minimaal 2 karakters zijn")
  .max(5000, "Reactie mag maximaal 5.000 karakters zijn");

// DM message validation
export const messageBodySchema = z
  .string()
  .min(1, "Bericht mag niet leeg zijn")
  .max(5000, "Bericht mag maximaal 5.000 karakters zijn");

// Login form schema
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Wachtwoord is verplicht"),
});

// Register form schema
export const registerFormSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  acceptedGuidelines: z.literal(true, {
    errorMap: () => ({ message: "Je moet akkoord gaan met de richtlijnen" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Wachtwoorden komen niet overeen",
  path: ["confirmPassword"],
});

// Profile update schema
export const profileUpdateSchema = z.object({
  username: usernameSchema,
  bio: bioSchema,
  allowDm: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
