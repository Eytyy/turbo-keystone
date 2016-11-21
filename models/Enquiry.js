var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
});

Enquiry.add({
	email: { type: Types.Email, required: true },
	createdAt: { type: Date, default: Date.now },
});

Enquiry.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function () {};
	}
	var enquiry = this;
	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
		if (err) return callback(err);
		new keystone.Email({
			templateName: 'enquiry-notification',
		}).send({
			to: admins,
			from: {
				name: 'Majdal',
				email: 'contact@majdal.com',
			},
			subject: 'New Enquiry for Majdal',
			enquiry: enquiry,
		}, callback);
	});
};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'email, createdAt';
Enquiry.register();
