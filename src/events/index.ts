import { getEmitter } from './emitter';
import { AppEvents } from './events';
import mailer from '../middlewares/sendMail';
import { IEmailRequest } from '../interfaces/email.type';

const event = getEmitter();

event.on(AppEvents.EMAIL_START, (request: IEmailRequest) => {
    mailer.sendEmail(request.to, request.subject, request.message)
    .then(info => event.emit(AppEvents.EMAIL_DELIVERED, info))
    .catch(error => event.emit(AppEvents.EMAIL_FAILED, error));
});