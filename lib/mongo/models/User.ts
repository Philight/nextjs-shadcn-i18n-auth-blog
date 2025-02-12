import { UserInterface } from '@/app/api/auth/[...nextauth]/next-auth';
import mongoose, {
  Schema, models 
} from 'mongoose';

const UserSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    socials: [
      {
        tag: {
          type: String,
          required: true,
        },
        label: {
          type: String,
          unique: true,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const User = models?.User || mongoose.model('User', UserSchema);

export default User;
