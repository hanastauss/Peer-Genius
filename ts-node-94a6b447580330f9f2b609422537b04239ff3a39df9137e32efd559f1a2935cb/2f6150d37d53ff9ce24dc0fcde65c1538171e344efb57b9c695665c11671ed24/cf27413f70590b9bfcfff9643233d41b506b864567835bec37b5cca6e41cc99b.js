"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const argon2_1 = require("argon2");
const reference_1 = require("../reference");
const user_1 = require("./user");
const errors_1 = require("../errors");
const attributes = {
    user: {
        type: Sequelize.UUID,
        references: {
            model: user_1.default,
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value);
            this.setDataValue('verified', false);
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
};
const blockUserEdit = (instance) => {
    if (instance.changed('user')) {
        throw new errors_1.ProhibitedEditError('Editing the user FK of accounts table is prohibited.');
    }
};
const hashPassword = (instance) => {
    if (instance.changed('password')) {
        return argon2_1.hash(instance.password).then(hash => instance.password = hash);
    }
};
const model = reference_1.sequelizeAdmin.define('accounts', attributes);
model.beforeCreate(hashPassword);
model.beforeUpdate('blockUserEdit', blockUserEdit);
model.beforeUpdate('hashPassword', hashPassword);
user_1.default.hasOne(model, { foreignKey: 'user' });
model.sync();
exports.default = model;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL2RhdGFiYXNlL21vZGVscy9hY2NvdW50LnRzIiwic291cmNlcyI6WyIvbW50L2MvVXNlcnMvSmVmZi9QZWVyLUdlbml1cy9zZXJ2ZXIvZGF0YWJhc2UvbW9kZWxzL2FjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBdUM7QUFDdkMsbUNBQThCO0FBRTlCLDRDQUF1RDtBQUN2RCxpQ0FBMEI7QUFDMUIsc0NBQWdEO0FBbUJoRCxNQUFNLFVBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7UUFDcEIsVUFBVSxFQUFFO1lBQ1gsS0FBSyxFQUFFLGNBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxTQUFTO1NBQ25CO1FBQ0QsVUFBVSxFQUFFLElBQUk7S0FDaEI7SUFDRCxLQUFLLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsTUFBTSxFQUFFLElBQUk7UUFDWixHQUFHLENBQUMsS0FBSztZQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FDRDtJQUNELFFBQVEsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztLQUNoQjtJQUNELFFBQVEsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTLENBQUMsT0FBTztRQUN2QixZQUFZLEVBQUUsS0FBSztLQUNuQjtDQUNELENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRyxDQUFDLFFBQXlCO0lBQy9DLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sSUFBSSw0QkFBbUIsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7QUFDRixDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLFFBQXlCO0lBQzlDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxhQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0FBQ0YsQ0FBQyxDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQXdELDBCQUFLLENBQUMsTUFBTSxDQUFxQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDNUksS0FBSyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNqQyxLQUFLLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNuRCxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUVqRCxjQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBRTNDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNiLGtCQUFlLEtBQUssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlcXVlbGl6ZSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IHsgaGFzaCB9IGZyb20gJ2FyZ29uMic7XG5cbmltcG9ydCB7IHNlcXVlbGl6ZUFkbWluIGFzIGFkbWluIH0gZnJvbSAnLi4vcmVmZXJlbmNlJztcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlcic7XG5pbXBvcnQgeyBQcm9oaWJpdGVkRWRpdEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBBY2NvdW50QXR0cmlidXRlcyB7XG5cdHVzZXI/OiBzdHJpbmc7XG5cdGVtYWlsPzogc3RyaW5nO1xuXHRwYXNzd29yZD86IHN0cmluZztcblx0dmVyaWZpZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjY291bnRJbnN0YW5jZSBleHRlbmRzIFNlcXVlbGl6ZS5JbnN0YW5jZTxBY2NvdW50QXR0cmlidXRlcz4ge1xuXHRjcmVhdGVkQXQ6IERhdGU7XG5cdHVwZGF0ZWRBdDogRGF0ZTtcblx0XG5cdHVzZXI6IHN0cmluZztcblx0ZW1haWw6IHN0cmluZztcblx0cGFzc3dvcmQ6IHN0cmluZztcblx0dmVyaWZpZWQ6IHN0cmluZztcbn1cblxuY29uc3QgYXR0cmlidXRlcyA9IHtcblx0dXNlcjoge1xuXHRcdHR5cGU6IFNlcXVlbGl6ZS5VVUlELFxuXHRcdHJlZmVyZW5jZXM6IHtcblx0XHRcdG1vZGVsOiB1c2VyLFxuXHRcdFx0a2V5OiAnaWQnLFxuXHRcdFx0b25VcGRhdGU6ICdjYXNjYWRlJyxcblx0XHRcdG9uRGVsZXRlOiAnY2FzY2FkZSdcblx0XHR9LFxuXHRcdHByaW1hcnlLZXk6IHRydWVcblx0fSxcblx0ZW1haWw6IHtcblx0XHR0eXBlOiBTZXF1ZWxpemUuU1RSSU5HLFxuXHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0dW5pcXVlOiB0cnVlLFxuXHRcdHNldCh2YWx1ZSkge1xuXHRcdFx0dGhpcy5zZXREYXRhVmFsdWUoJ2VtYWlsJywgdmFsdWUpO1xuXHRcdFx0dGhpcy5zZXREYXRhVmFsdWUoJ3ZlcmlmaWVkJywgZmFsc2UpO1xuXHRcdH1cblx0fSxcblx0cGFzc3dvcmQ6IHtcblx0XHR0eXBlOiBTZXF1ZWxpemUuU1RSSU5HLFxuXHRcdGFsbG93TnVsbDogZmFsc2Vcblx0fSxcblx0dmVyaWZpZWQ6IHtcblx0XHR0eXBlOiBTZXF1ZWxpemUuQk9PTEVBTixcblx0XHRkZWZhdWx0VmFsdWU6IGZhbHNlXG5cdH1cbn07XG5cbmNvbnN0IGJsb2NrVXNlckVkaXQgPSAoaW5zdGFuY2U6IEFjY291bnRJbnN0YW5jZSkgPT4ge1xuXHRpZiAoaW5zdGFuY2UuY2hhbmdlZCgndXNlcicpKSB7XG5cdFx0dGhyb3cgbmV3IFByb2hpYml0ZWRFZGl0RXJyb3IoJ0VkaXRpbmcgdGhlIHVzZXIgRksgb2YgYWNjb3VudHMgdGFibGUgaXMgcHJvaGliaXRlZC4nKTtcblx0fVxufTtcblxuY29uc3QgaGFzaFBhc3N3b3JkID0gKGluc3RhbmNlOiBBY2NvdW50SW5zdGFuY2UpID0+IHtcblx0aWYgKGluc3RhbmNlLmNoYW5nZWQoJ3Bhc3N3b3JkJykpIHtcblx0XHRyZXR1cm4gaGFzaChpbnN0YW5jZS5wYXNzd29yZCkudGhlbihoYXNoID0+IGluc3RhbmNlLnBhc3N3b3JkID0gaGFzaCk7XG5cdH1cbn07XG5cbmNvbnN0IG1vZGVsOiBTZXF1ZWxpemUuTW9kZWw8QWNjb3VudEluc3RhbmNlLCBBY2NvdW50QXR0cmlidXRlcz4gPSBhZG1pbi5kZWZpbmU8QWNjb3VudEluc3RhbmNlLCBBY2NvdW50QXR0cmlidXRlcz4oJ2FjY291bnRzJywgYXR0cmlidXRlcyk7XG5tb2RlbC5iZWZvcmVDcmVhdGUoaGFzaFBhc3N3b3JkKTtcbm1vZGVsLmJlZm9yZVVwZGF0ZSgnYmxvY2tVc2VyRWRpdCcsIGJsb2NrVXNlckVkaXQpO1xubW9kZWwuYmVmb3JlVXBkYXRlKCdoYXNoUGFzc3dvcmQnLCBoYXNoUGFzc3dvcmQpO1xuXG51c2VyLmhhc09uZShtb2RlbCwgeyBmb3JlaWduS2V5OiAndXNlcicgfSk7XG5cbm1vZGVsLnN5bmMoKTtcbmV4cG9ydCBkZWZhdWx0IG1vZGVsO1xuIl19