import { z } from "zod";
import { CreateTermsConditionsSchema } from "./create.TermsConditions";

export const UpdateTermsConditionsSchema = CreateTermsConditionsSchema.partial();

export type UpdateTermsConditionsType = z.infer<typeof UpdateTermsConditionsSchema>;