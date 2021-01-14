interface Provider {
	restricted: boolean;
}

/**
 *
 * @param assets All assets tied to the brief
 */
export const filterViewableAssetsForClient = (
	assets: Array<Provider>
): object[] => {
	const viewableAssets: object[] = assets.filter(
		(asset) => asset.restricted === false
	);

	return viewableAssets;
};
