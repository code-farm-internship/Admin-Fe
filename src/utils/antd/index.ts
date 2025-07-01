export const selectSearch = (option: { searchLabel: string; value: number | string } | undefined, input: string) => {
    return (option?.searchLabel ?? '').toLowerCase().includes(input.toLowerCase());
};
