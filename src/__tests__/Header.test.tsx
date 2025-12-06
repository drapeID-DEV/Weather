import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import citiesSlice from '@/store/slices/citiesSlice'
import { Header } from '@/components/Header'
import { CITIES } from '@/shared/data/cities.data'

const store = configureStore({
	reducer: {
		cities: citiesSlice.reducer
	}
})

describe('Header', () => {
	it('renders select when isHome is true', () => {
		render(
			<Provider store={store}>
				<Header isHome={true} />
			</Provider>
		)

		const select = screen.getByRole('combobox')
		expect(select).toBeInTheDocument()
		CITIES.forEach((city) => {
			expect(
				screen.getByRole('option', { name: city.name })
			).toBeInTheDocument()
		})
	})

	it('renders heading when isHome is false', () => {
		const testCity = 'London'
		render(
			<Provider store={store}>
				<Header isHome={false} city={testCity} />
			</Provider>
		)

		const heading = screen.getByRole('heading', { level: 1 })
		expect(heading).toHaveTextContent(testCity)
	})

	it('dispatches addCity when a city is selected', () => {
		render(
			<Provider store={store}>
				<Header isHome={true} />
			</Provider>
		)

		const select = screen.getByRole('combobox')
		const cityToAdd = CITIES[0].name

		expect(store.getState().cities.selectedCities).toHaveLength(0)

		fireEvent.change(select, { target: { value: cityToAdd } })

		const selected = store.getState().cities.selectedCities
		expect(selected).toHaveLength(1)
		expect(selected[0].name).toBe(cityToAdd)
	})
})
