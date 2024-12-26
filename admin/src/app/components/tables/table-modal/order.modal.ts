export interface Order {
    orderId: number;                       // Corresponds to ORDERID
    orderNumber: string;                   // Corresponds to ORDERNUMBER
    orderDate: string;                       // Corresponds to ORDERDATE
    customerId: number;                    // Corresponds to CUSTOMERID
    productId: number;                     // Corresponds to PRODUCTID
    productName: string;                   // Corresponds to PRODUCTNAME
    quantity: number;                      // Corresponds to QUANTITY
    unitCost: number;                      // Corresponds to UNITCOST
    lineTotal: number;                     // Corresponds to LINETOTAL
    taxAmount: number;                     // Corresponds to TAXAMOUNT
    lineTotalWithTax: number;              // Corresponds to LINETOTALWITHTAX
    totalAmount: number;                   // Corresponds to TOTALAMOUNT
    discountAmount: number;                // Corresponds to DISCOUNTAMOUNT
    taxAmountOrder: number;                // Corresponds to TAXAMOUNTORDER
    paymentMethod: string;                 // Corresponds to PAYMENTMETHOD
    paymentStatus: string;                 // Corresponds to PAYMENTSTATUS
    status: string;                        // Corresponds to STATUS
    createdAt: Date;                       // Corresponds to CREATEDAT
    updatedAt: Date;                       // Corresponds to UPDATEDAT
  }
  