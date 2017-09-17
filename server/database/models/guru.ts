import * as Sequelize from 'sequelize';
import { without } from 'lodash';

import { ProhibitedEditError } from '../errors';
import { sequelizeAdmin as admin } from '../reference';
import user from './user';

export interface GuruAttributes {
	userId?: string;
	'english:americanLiterature'?: boolean;
	'english:britishLiterature'?: boolean;
	'english:contemporaryLiterature'?: boolean;
	'english:creativeWriting'?: boolean;
	'english:englishLanguageAndComposition'?: boolean;
	'english:englishLiteratureAndComposition'?: boolean;
	'english:literaryAnalysis'?: boolean;
	'english:modernLiterature'?: boolean;
	'english:poetry'?: boolean;
	'english:worldLiterature'?: boolean;
	'english:writtenAndOralCommunication'?: boolean;
	'english:apEnglishLanguageAndComposition'?: boolean;
	'english:apEnglishLiteratureAndComposition'?: boolean;
	'foreignLanguage:americanSignLanguage'?: boolean;
	'foreignLanguage:ancientGreek'?: boolean;
	'foreignLanguage:arabic'?: boolean;
	'foreignLanguage:chinese'?: boolean;
	'foreignLanguage:french'?: boolean;
	'foreignLanguage:german'?: boolean;
	'foreignLanguage:hebrew'?: boolean;
	'foreignLanguage:italian'?: boolean;
	'foreignLanguage:japanese'?: boolean;
	'foreignLanguage:korean'?: boolean;
	'foreignLanguage:latin'?: boolean;
	'foreignLanguage:portuguese'?: boolean;
	'foreignLanguage:russian'?: boolean;
	'foreignLanguage:spanish'?: boolean;
	'foreignLanguage:apChineseLanguageAndCulture'?: boolean;
	'foreignLanguage:apFrenchLanguageAndCulture'?: boolean;
	'foreignLanguage:apGermanLanguageAndCulture'?: boolean;
	'foreignLanguage:apItalianLanguageAndCulture'?: boolean;
	'foreignLanguage:apJapaneseLanguageAndCulture'?: boolean;
	'foreignLanguage:apLatin'?: boolean;
	'foreignLanguage:apSpanishLanguageAndCulture'?: boolean;
	'foreignLanguage:apSpanishLiteratureAndCulture'?: boolean;
	'math:algebra1'?: boolean;
	'math:algebra2'?: boolean;
	'math:calculus'?: boolean;
	'math:geometry'?: boolean;
	'math:multivariableCalculus'?: boolean;
	'math:practicalMath'?: boolean;
	'math:preAlgebra'?: boolean;
	'math:preCalculus'?: boolean;
	'math:probability'?: boolean;
	'math:quantitativeLiteracy'?: boolean;
	'math:statistics'?: boolean;
	'math:trigonometry'?: boolean;
	'math:apCalculusAb'?: boolean;
	'math:apCalculusBc'?: boolean;
	'math:apStatistics'?: boolean;
	'computerScience:apComputerScienceA'?: boolean;
	'computerScience:apComputerSciencePrinciples'?: boolean;
	'science:biology'?: boolean;
	'science:chemistry'?: boolean;
	'science:earthScience'?: boolean;
	'science:environmentalScience'?: boolean;
	'science:environmentalStudies'?: boolean;
	'science:forensicScience'?: boolean;
	'science:geology'?: boolean;
	'science:marineBiology'?: boolean;
	'science:physicalScience'?: boolean;
	'science:physics'?: boolean;
	'science:apBiology'?: boolean;
	'science:apChemistry'?: boolean;
	'science:apEnvironmentalScience'?: boolean;
	'science:apPhysicsCMechanics'?: boolean;
	'science:apPhysicsCElectricityAndMagnetism'?: boolean;
	'science:apPhysics1AlgebraBased'?: boolean;
	'science:apPhysics2AlgebraBased'?: boolean;
	'socialStudies:culturalAnthropology'?: boolean;
	'socialStudies:currentEvents'?: boolean;
	'socialStudies:europeanHistory'?: boolean;
	'socialStudies:geography'?: boolean;
	'socialStudies:globalStudies'?: boolean;
	'socialStudies:humanGeography'?: boolean;
	'socialStudies:internationalRelations'?: boolean;
	'socialStudies:law'?: boolean;
	'socialStudies:macroeconomics'?: boolean;
	'socialStudies:microeconomics'?: boolean;
	'socialStudies:modernWorldStudies'?: boolean;
	'socialStudies:physicalAnthropology'?: boolean;
	'socialStudies:politicalStudies'?: boolean;
	'socialStudies:psychology'?: boolean;
	'socialStudies:religiousStudies'?: boolean;
	'socialStudies:sociology'?: boolean;
	'socialStudies:usGovernment'?: boolean;
	'socialStudies:usHistory'?: boolean;
	'socialStudies:womensStudies'?: boolean;
	'socialStudies:worldHistory'?: boolean;
	'socialStudies:worldPolitics'?: boolean;
	'socialStudies:worldReligions'?: boolean;
	'socialStudies:apComparativeGovernmentAndPolitics'?: boolean;
	'socialStudies:apEuropeanHistory'?: boolean;
	'socialStudies:apHumanGeography'?: boolean;
	'socialStudies:apMacroeconomics'?: boolean;
	'socialStudies:apMicroeconomics'?: boolean;
	'socialStudies:apPsychology'?: boolean;
	'socialStudies:apUnitedStatesGovernmentAndPolitics'?: boolean;
	'socialStudies:apUnitedStatesHistory'?: boolean;
	'socialStudies:apWorldHistory'?: boolean;
}

export interface GuruInstance extends Sequelize.Instance<GuruAttributes> {
	createdAt: Date;
	updatedAt: Date;
	
	userId: string;
	'english:americanLiterature': boolean;
	'english:britishLiterature': boolean;
	'english:contemporaryLiterature': boolean;
	'english:creativeWriting': boolean;
	'english:englishLanguageAndComposition': boolean;
	'english:englishLiteratureAndComposition': boolean;
	'english:literaryAnalysis': boolean;
	'english:modernLiterature': boolean;
	'english:poetry': boolean;
	'english:worldLiterature': boolean;
	'english:writtenAndOralCommunication': boolean;
	'english:apEnglishLanguageAndComposition': boolean;
	'english:apEnglishLiteratureAndComposition': boolean;
	'foreignLanguage:americanSignLanguage': boolean;
	'foreignLanguage:ancientGreek': boolean;
	'foreignLanguage:arabic': boolean;
	'foreignLanguage:chinese': boolean;
	'foreignLanguage:french': boolean;
	'foreignLanguage:german': boolean;
	'foreignLanguage:hebrew': boolean;
	'foreignLanguage:italian': boolean;
	'foreignLanguage:japanese': boolean;
	'foreignLanguage:korean': boolean;
	'foreignLanguage:latin': boolean;
	'foreignLanguage:portuguese': boolean;
	'foreignLanguage:russian': boolean;
	'foreignLanguage:spanish': boolean;
	'foreignLanguage:apChineseLanguageAndCulture': boolean;
	'foreignLanguage:apFrenchLanguageAndCulture': boolean;
	'foreignLanguage:apGermanLanguageAndCulture': boolean;
	'foreignLanguage:apItalianLanguageAndCulture': boolean;
	'foreignLanguage:apJapaneseLanguageAndCulture': boolean;
	'foreignLanguage:apLatin': boolean;
	'foreignLanguage:apSpanishLanguageAndCulture': boolean;
	'foreignLanguage:apSpanishLiteratureAndCulture': boolean;
	'math:algebra1': boolean;
	'math:algebra2': boolean;
	'math:calculus': boolean;
	'math:geometry': boolean;
	'math:multivariableCalculus': boolean;
	'math:practicalMath': boolean;
	'math:preAlgebra': boolean;
	'math:preCalculus': boolean;
	'math:probability': boolean;
	'math:quantitativeLiteracy': boolean;
	'math:statistics': boolean;
	'math:trigonometry': boolean;
	'math:apCalculusAb': boolean;
	'math:apCalculusBc': boolean;
	'math:apStatistics': boolean;
	'computerScience:apComputerScienceA': boolean;
	'computerScience:apComputerSciencePrinciples': boolean;
	'science:biology': boolean;
	'science:chemistry': boolean;
	'science:earthScience': boolean;
	'science:environmentalScience': boolean;
	'science:environmentalStudies': boolean;
	'science:forensicScience': boolean;
	'science:geology': boolean;
	'science:marineBiology': boolean;
	'science:physicalScience': boolean;
	'science:physics': boolean;
	'science:apBiology': boolean;
	'science:apChemistry': boolean;
	'science:apEnvironmentalScience': boolean;
	'science:apPhysicsCMechanics': boolean;
	'science:apPhysicsCElectricityAndMagnetism': boolean;
	'science:apPhysics1AlgebraBased': boolean;
	'science:apPhysics2AlgebraBased': boolean;
	'socialStudies:culturalAnthropology': boolean;
	'socialStudies:currentEvents': boolean;
	'socialStudies:europeanHistory': boolean;
	'socialStudies:geography': boolean;
	'socialStudies:globalStudies': boolean;
	'socialStudies:humanGeography': boolean;
	'socialStudies:internationalRelations': boolean;
	'socialStudies:law': boolean;
	'socialStudies:macroeconomics': boolean;
	'socialStudies:microeconomics': boolean;
	'socialStudies:modernWorldStudies': boolean;
	'socialStudies:physicalAnthropology': boolean;
	'socialStudies:politicalStudies': boolean;
	'socialStudies:psychology': boolean;
	'socialStudies:religiousStudies': boolean;
	'socialStudies:sociology': boolean;
	'socialStudies:usGovernment': boolean;
	'socialStudies:usHistory': boolean;
	'socialStudies:womensStudies': boolean;
	'socialStudies:worldHistory': boolean;
	'socialStudies:worldPolitics': boolean;
	'socialStudies:worldReligions': boolean;
	'socialStudies:apComparativeGovernmentAndPolitics': boolean;
	'socialStudies:apEuropeanHistory': boolean;
	'socialStudies:apHumanGeography': boolean;
	'socialStudies:apMacroeconomics': boolean;
	'socialStudies:apMicroeconomics': boolean;
	'socialStudies:apPsychology': boolean;
	'socialStudies:apUnitedStatesGovernmentAndPolitics': boolean;
	'socialStudies:apUnitedStatesHistory': boolean;
	'socialStudies:apWorldHistory': boolean;
}

const attributes = {
	userId: {
		type: Sequelize.UUID,
		references: {
			model: user,
			key: 'id',
			onUpdate: 'cascade',
			onDelete: 'cascade'
		},
		primaryKey: true
	},
	// The following indicate whether the user can teach the following subjects.
	'english:americanLiterature': Sequelize.BOOLEAN,
	'english:britishLiterature': Sequelize.BOOLEAN,
	'english:contemporaryLiterature': Sequelize.BOOLEAN,
	'english:creativeWriting': Sequelize.BOOLEAN,
	'english:englishLanguageAndComposition': Sequelize.BOOLEAN,
	'english:englishLiteratureAndComposition': Sequelize.BOOLEAN,
	'english:literaryAnalysis': Sequelize.BOOLEAN,
	'english:modernLiterature': Sequelize.BOOLEAN,
	'english:poetry': Sequelize.BOOLEAN,
	'english:worldLiterature': Sequelize.BOOLEAN,
	'english:writtenAndOralCommunication': Sequelize.BOOLEAN,
	'english:apEnglishLanguageAndComposition': Sequelize.BOOLEAN,
	'english:apEnglishLiteratureAndComposition': Sequelize.BOOLEAN,
	'foreignLanguage:americanSignLanguage': Sequelize.BOOLEAN,
	'foreignLanguage:ancientGreek': Sequelize.BOOLEAN,
	'foreignLanguage:arabic': Sequelize.BOOLEAN,
	'foreignLanguage:chinese': Sequelize.BOOLEAN,
	'foreignLanguage:french': Sequelize.BOOLEAN,
	'foreignLanguage:german': Sequelize.BOOLEAN,
	'foreignLanguage:hebrew': Sequelize.BOOLEAN,
	'foreignLanguage:italian': Sequelize.BOOLEAN,
	'foreignLanguage:japanese': Sequelize.BOOLEAN,
	'foreignLanguage:korean': Sequelize.BOOLEAN,
	'foreignLanguage:latin': Sequelize.BOOLEAN,
	'foreignLanguage:portuguese': Sequelize.BOOLEAN,
	'foreignLanguage:russian': Sequelize.BOOLEAN,
	'foreignLanguage:spanish': Sequelize.BOOLEAN,
	'foreignLanguage:apChineseLanguageAndCulture': Sequelize.BOOLEAN,
	'foreignLanguage:apFrenchLanguageAndCulture': Sequelize.BOOLEAN,
	'foreignLanguage:apGermanLanguageAndCulture': Sequelize.BOOLEAN,
	'foreignLanguage:apItalianLanguageAndCulture': Sequelize.BOOLEAN,
	'foreignLanguage:apJapaneseLanguageAndCulture': Sequelize.BOOLEAN,
	'foreignLanguage:apLatin': Sequelize.BOOLEAN,
	'foreignLanguage:apSpanishLanguageAndCulture': Sequelize.BOOLEAN,
	'foreignLanguage:apSpanishLiteratureAndCulture': Sequelize.BOOLEAN,
	'math:algebra1': Sequelize.BOOLEAN,
	'math:algebra2': Sequelize.BOOLEAN,
	'math:calculus': Sequelize.BOOLEAN,
	'math:geometry': Sequelize.BOOLEAN,
	'math:multivariableCalculus': Sequelize.BOOLEAN,
	'math:practicalMath': Sequelize.BOOLEAN,
	'math:preAlgebra': Sequelize.BOOLEAN,
	'math:preCalculus': Sequelize.BOOLEAN,
	'math:probability': Sequelize.BOOLEAN,
	'math:quantitativeLiteracy': Sequelize.BOOLEAN,
	'math:statistics': Sequelize.BOOLEAN,
	'math:trigonometry': Sequelize.BOOLEAN,
	'math:apCalculusAb': Sequelize.BOOLEAN,
	'math:apCalculusBc': Sequelize.BOOLEAN,
	'math:apStatistics': Sequelize.BOOLEAN,
	'computerScience:apComputerScienceA': Sequelize.BOOLEAN,
	'computerScience:apComputerSciencePrinciples': Sequelize.BOOLEAN,
	'science:biology': Sequelize.BOOLEAN,
	'science:chemistry': Sequelize.BOOLEAN,
	'science:earthScience': Sequelize.BOOLEAN,
	'science:environmentalScience': Sequelize.BOOLEAN,
	'science:environmentalStudies': Sequelize.BOOLEAN,
	'science:forensicScience': Sequelize.BOOLEAN,
	'science:geology': Sequelize.BOOLEAN,
	'science:marineBiology': Sequelize.BOOLEAN,
	'science:physicalScience': Sequelize.BOOLEAN,
	'science:physics': Sequelize.BOOLEAN,
	'science:apBiology': Sequelize.BOOLEAN,
	'science:apChemistry': Sequelize.BOOLEAN,
	'science:apEnvironmentalScience': Sequelize.BOOLEAN,
	'science:apPhysicsCMechanics': Sequelize.BOOLEAN,
	'science:apPhysicsCElectricityAndMagnetism': Sequelize.BOOLEAN,
	'science:apPhysics1AlgebraBased': Sequelize.BOOLEAN,
	'science:apPhysics2AlgebraBased': Sequelize.BOOLEAN,
	'socialStudies:culturalAnthropology': Sequelize.BOOLEAN,
	'socialStudies:currentEvents': Sequelize.BOOLEAN,
	'socialStudies:europeanHistory': Sequelize.BOOLEAN,
	'socialStudies:geography': Sequelize.BOOLEAN,
	'socialStudies:globalStudies': Sequelize.BOOLEAN,
	'socialStudies:humanGeography': Sequelize.BOOLEAN,
	'socialStudies:internationalRelations': Sequelize.BOOLEAN,
	'socialStudies:law': Sequelize.BOOLEAN,
	'socialStudies:macroeconomics': Sequelize.BOOLEAN,
	'socialStudies:microeconomics': Sequelize.BOOLEAN,
	'socialStudies:modernWorldStudies': Sequelize.BOOLEAN,
	'socialStudies:physicalAnthropology': Sequelize.BOOLEAN,
	'socialStudies:politicalStudies': Sequelize.BOOLEAN,
	'socialStudies:psychology': Sequelize.BOOLEAN,
	'socialStudies:religiousStudies': Sequelize.BOOLEAN,
	'socialStudies:sociology': Sequelize.BOOLEAN,
	'socialStudies:usGovernment': Sequelize.BOOLEAN,
	'socialStudies:usHistory': Sequelize.BOOLEAN,
	'socialStudies:womensStudies': Sequelize.BOOLEAN,
	'socialStudies:worldHistory': Sequelize.BOOLEAN,
	'socialStudies:worldPolitics': Sequelize.BOOLEAN,
	'socialStudies:worldReligions': Sequelize.BOOLEAN,
	'socialStudies:apComparativeGovernmentAndPolitics': Sequelize.BOOLEAN,
	'socialStudies:apEuropeanHistory': Sequelize.BOOLEAN,
	'socialStudies:apHumanGeography': Sequelize.BOOLEAN,
	'socialStudies:apMacroeconomics': Sequelize.BOOLEAN,
	'socialStudies:apMicroeconomics': Sequelize.BOOLEAN,
	'socialStudies:apPsychology': Sequelize.BOOLEAN,
	'socialStudies:apUnitedStatesGovernmentAndPolitics': Sequelize.BOOLEAN,
	'socialStudies:apUnitedStatesHistory': Sequelize.BOOLEAN,
	'socialStudies:apWorldHistory': Sequelize.BOOLEAN
};

export const subjects = without(Object.keys(attributes), 'user');

const blockUserEdit = (instance: GuruInstance) => {
	if (instance.changed('userId')) {
		throw new ProhibitedEditError('Editing the user FK of gurus table is prohibited.');
	}
};

const model: Sequelize.Model<GuruInstance, GuruAttributes> = admin.define('gurus', attributes);
model.beforeUpdate(blockUserEdit);

model.belongsTo(user, {
	foreignKey: 'userId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});
user.hasOne(model, {
	foreignKey: 'userId',
	onUpdate: 'cascade',
	onDelete: 'cascade'
});

model.sync();
export default model;
