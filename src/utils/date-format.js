/**
 * Форматирование даты
 * @param value {String}
 * @returns {String}
 */
import moment from 'moment';

export default function dateFormat(date) {
	return moment(date).locale('ru').format('D MMMM YYYY [в] HH:mm')
}