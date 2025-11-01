import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  items: [
    {
      description: String,
      quantity: Number,
      price: Number,
    },
  ],
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
