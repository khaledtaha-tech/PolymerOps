import nodemailer from 'nodemailer';
let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;
export async function sendRequestEmails(input:{id:number;email:string;name:string;type:string;locale:'ar'|'en'}){
 const {SMTP_HOST,SMTP_USER,SMTP_PASSWORD,SMTP_FROM,ADMIN_NOTIFY_EMAIL}=process.env;
 if(!SMTP_HOST||!SMTP_USER||!SMTP_PASSWORD||!SMTP_FROM)return;
 if(!transporter)transporter=nodemailer.createTransport({host:SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:Number(process.env.SMTP_PORT||587)===465,auth:{user:SMTP_USER,pass:SMTP_PASSWORD},requireTLS:Number(process.env.SMTP_PORT||587)!==465});
 const arabic=input.locale==='ar';
 await transporter.sendMail({from:SMTP_FROM,to:input.email,subject:arabic?`استلمنا طلبك رقم ${input.id}`:`Your request #${input.id} was received`,text:arabic?`مرحبًا ${input.name}،\n\nاستلمنا طلبك رقم ${input.id} وسنراجع التفاصيل ثم نتواصل معك.\n\nPolymerOps Hub`:`Hello ${input.name},\n\nWe received your request #${input.id}. We will review the details and contact you.\n\nPolymerOps Hub`});
 if(ADMIN_NOTIFY_EMAIL)await transporter.sendMail({from:SMTP_FROM,to:ADMIN_NOTIFY_EMAIL,subject:`New PolymerOps request #${input.id}`,text:`Request #${input.id}\nType: ${input.type}\nReview securely in the admin dashboard. No attachment is included in this email.`});
}
