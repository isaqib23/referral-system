import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    referral_code: string

    @Prop()
    referral_count: number

    @Prop()
    referred_by: string
}

export const UserSchema = SchemaFactory.createForClass(User);