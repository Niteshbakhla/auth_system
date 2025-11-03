import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
            name: { type: String, required: true, lowercase: true },
            email: { type: String, required: true, lowercase: true, unque: true, trim: true },
            password: { type: String, required: true, },
            isVerified: { type: Boolean, required: true, default: false },
            roles: { type: String, enum: ["admin", "user"], default: "user" }
}, { timestamps: true });


// Hashing password before saving
userSchema.pre("save", async function (next) {
            if (!this.isModified("password")) next();
            this.password = await bcrypt.hash(this.password, 10);
            next();
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
            return bcrypt.compare(password, this.password);
}

//  Index for faster email lookups
userSchema.index({ email: 1 })

const User = mongoose.model("User", userSchema);
export default User;