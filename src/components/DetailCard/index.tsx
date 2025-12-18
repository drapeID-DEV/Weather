import styles from './DetailCard.module.scss'

import { IWeatherResponse } from '@/shared/types/weatherResponse.type'

interface Props {
	data: IWeatherResponse | null
}

export function DetailCard({ data }: Props) {
	return (
		<div className={styles.container}>
			<p>Temp: {data?.current.temp}°C</p>
			<p>Feels like: {data?.current.feels_like}°C</p>
			<p>Humidity: {data?.current.humidity}%</p>
			<p>Clouds: {data?.current.clouds}%</p>
			<p>Visibility: {data?.current.visibility}m</p>
			<p>Wind speed: {data?.current.wind_speed}m/s</p>
		</div>
	)
}
