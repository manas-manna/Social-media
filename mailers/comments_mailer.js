const nodeMailer = require('../config/nodemailer');

//this is another way of exporting modules
exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment:comment} , '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'manastemp1999@gmail.com',
        to: comment.post.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (err, info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent');
        return;
    })
}
