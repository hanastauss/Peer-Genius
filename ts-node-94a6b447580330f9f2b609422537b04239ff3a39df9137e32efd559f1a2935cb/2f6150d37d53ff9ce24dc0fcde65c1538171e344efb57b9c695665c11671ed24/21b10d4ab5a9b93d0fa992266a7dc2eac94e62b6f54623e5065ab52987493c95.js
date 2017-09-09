"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const reference_1 = require("../reference");
const errors_1 = require("../errors");
exports.attributes = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        set(value) {
            if (value.year && value.month && value.date) {
                this.setDataValue('birthday', new Date(Date.UTC(value.year, value.month, value.date, 12))); // hour = 12 because things are weird when it's set to midnight.
            }
            else {
                this.setDataValue('birthday', value);
            }
        }
    }
};
exports.exposedAttributes = Object.keys(exports.attributes);
const blockIdEdit = (instance) => {
    if (instance.changed('id')) {
        throw new errors_1.ProhibitedEditError('Editing the id PK of users table is prohibited.');
    }
};
const model = reference_1.sequelizeAdmin.define('users', exports.attributes);
model.beforeUpdate(blockIdEdit);
model.sync(); // Alter when in development mode
exports.default = model;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL2RhdGFiYXNlL21vZGVscy91c2VyLnRzIiwic291cmNlcyI6WyIvbW50L2MvVXNlcnMvSmVmZi9QZWVyLUdlbml1cy9zZXJ2ZXIvZGF0YWJhc2UvbW9kZWxzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1Q0FBdUM7QUFFdkMsNENBQXVEO0FBQ3ZELHNDQUFnRDtBQW1CbkMsUUFBQSxVQUFVLEdBQUc7SUFDekIsRUFBRSxFQUFFO1FBQ0gsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO1FBQ3BCLFlBQVksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUM5QixVQUFVLEVBQUUsSUFBSTtLQUNoQjtJQUNELFNBQVMsRUFBRTtRQUNWLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsRUFBRTtLQUNoQjtJQUNELFFBQVEsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsRUFBRTtLQUNoQjtJQUNELFFBQVEsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTLENBQUMsUUFBUTtRQUN4QixTQUFTLEVBQUUsSUFBSTtRQUNmLEdBQUcsQ0FBQyxLQUFLO1lBQ1IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdFQUFnRTtZQUM3SixDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEMsQ0FBQztRQUNGLENBQUM7S0FDRDtDQUNELENBQUM7QUFFVyxRQUFBLGlCQUFpQixHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQVUsQ0FBQyxDQUFDO0FBRW5FLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBc0I7SUFDMUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxJQUFJLDRCQUFtQixDQUFDLGlEQUFpRCxDQUFDLENBQUM7SUFDbEYsQ0FBQztBQUNGLENBQUMsQ0FBQztBQUVGLE1BQU0sS0FBSyxHQUFrRCwwQkFBSyxDQUFDLE1BQU0sQ0FBK0IsT0FBTyxFQUFFLGtCQUFVLENBQUMsQ0FBQztBQUM3SCxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLGlDQUFpQztBQUUvQyxrQkFBZSxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3aXRob3V0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIFNlcXVlbGl6ZSBmcm9tICdzZXF1ZWxpemUnO1xuXG5pbXBvcnQgeyBzZXF1ZWxpemVBZG1pbiBhcyBhZG1pbiB9IGZyb20gJy4uL3JlZmVyZW5jZSc7XG5pbXBvcnQgeyBQcm9oaWJpdGVkRWRpdEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyQXR0cmlidXRlcyB7XG5cdGlkPzogc3RyaW5nO1xuXHRmaXJzdE5hbWU/OiBzdHJpbmc7XG5cdGxhc3ROYW1lPzogc3RyaW5nO1xuXHRiaXJ0aGRheT86IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlckluc3RhbmNlIGV4dGVuZHMgU2VxdWVsaXplLkluc3RhbmNlPFVzZXJBdHRyaWJ1dGVzPiB7XG5cdGNyZWF0ZWRBdDogRGF0ZTtcblx0dXBkYXRlZEF0OiBEYXRlO1xuXHRcblx0aWQ6IHN0cmluZztcblx0Zmlyc3ROYW1lOiBzdHJpbmc7XG5cdGxhc3ROYW1lOiBzdHJpbmc7XG5cdGJpcnRoZGF5OiBEYXRlO1xufVxuXG5leHBvcnQgY29uc3QgYXR0cmlidXRlcyA9IHtcblx0aWQ6IHtcblx0XHR0eXBlOiBTZXF1ZWxpemUuVVVJRCxcblx0XHRkZWZhdWx0VmFsdWU6IFNlcXVlbGl6ZS5VVUlEVjQsXG5cdFx0cHJpbWFyeUtleTogdHJ1ZVxuXHR9LFxuXHRmaXJzdE5hbWU6IHtcblx0XHR0eXBlOiBTZXF1ZWxpemUuU1RSSU5HLFxuXHRcdGFsbG93TnVsbDogZmFsc2UsXG5cdFx0ZGVmYXVsdFZhbHVlOiAnJ1xuXHR9LFxuXHRsYXN0TmFtZToge1xuXHRcdHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcsXG5cdFx0YWxsb3dOdWxsOiBmYWxzZSxcblx0XHRkZWZhdWx0VmFsdWU6ICcnXG5cdH0sXG5cdGJpcnRoZGF5OiB7XG5cdFx0dHlwZTogU2VxdWVsaXplLkRBVEVPTkxZLFxuXHRcdGFsbG93TnVsbDogdHJ1ZSxcblx0XHRzZXQodmFsdWUpIHtcblx0XHRcdGlmICh2YWx1ZS55ZWFyICYmIHZhbHVlLm1vbnRoICYmIHZhbHVlLmRhdGUpIHtcblx0XHRcdFx0dGhpcy5zZXREYXRhVmFsdWUoJ2JpcnRoZGF5JywgbmV3IERhdGUoRGF0ZS5VVEModmFsdWUueWVhciwgdmFsdWUubW9udGgsIHZhbHVlLmRhdGUsIDEyKSkpOyAvLyBob3VyID0gMTIgYmVjYXVzZSB0aGluZ3MgYXJlIHdlaXJkIHdoZW4gaXQncyBzZXQgdG8gbWlkbmlnaHQuXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXREYXRhVmFsdWUoJ2JpcnRoZGF5JywgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IGV4cG9zZWRBdHRyaWJ1dGVzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpO1xuXG5jb25zdCBibG9ja0lkRWRpdCA9IChpbnN0YW5jZTogVXNlckluc3RhbmNlKSA9PiB7XG5cdGlmIChpbnN0YW5jZS5jaGFuZ2VkKCdpZCcpKSB7XG5cdFx0dGhyb3cgbmV3IFByb2hpYml0ZWRFZGl0RXJyb3IoJ0VkaXRpbmcgdGhlIGlkIFBLIG9mIHVzZXJzIHRhYmxlIGlzIHByb2hpYml0ZWQuJyk7XG5cdH1cbn07XG5cbmNvbnN0IG1vZGVsOiBTZXF1ZWxpemUuTW9kZWw8VXNlckluc3RhbmNlLCBVc2VyQXR0cmlidXRlcz4gPSBhZG1pbi5kZWZpbmU8VXNlckluc3RhbmNlLCBVc2VyQXR0cmlidXRlcz4oJ3VzZXJzJywgYXR0cmlidXRlcyk7XG5tb2RlbC5iZWZvcmVVcGRhdGUoYmxvY2tJZEVkaXQpO1xubW9kZWwuc3luYygpOyAvLyBBbHRlciB3aGVuIGluIGRldmVsb3BtZW50IG1vZGVcblxuZXhwb3J0IGRlZmF1bHQgbW9kZWw7XG4iXX0=