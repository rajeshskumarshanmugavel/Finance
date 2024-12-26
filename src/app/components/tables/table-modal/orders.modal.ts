export interface Order {
    orderId: number;           
    orderNumber?: string;     
    orderDate?: string;        
    customerId?: number;      
    productId: number;         
    quantity: number;          
    unitCost: number;          
    lineTotal: number;         
    taxAmount?: number;        
    lineTotalWithTax: number; 
    totalAmount: number;      
    discountAmount?: number;  
    taxAmountOrder?: number;   
    paymentMethod?: string;    
    paymentStatus?: string;    
    status?: string;           
    createdAt?: Date;          
    updatedAt?: Date;          
  }