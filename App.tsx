/** @format */

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function App() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState('');

	const fetchData = () => {
		return fetch('https://reactnative.dev/movies.json')
			.then((response) => response.json())
			.then((json) => setData(json.movies))
			.catch((e) => console.log(e));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar style='auto' />
			<Text>Fetching Data</Text>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					data={data}
					keyExtractor={({ id }, index) => id}
					renderItem={({ item }) => (
						<Text>
							{item.title}, {item.releaseYear}
						</Text>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
