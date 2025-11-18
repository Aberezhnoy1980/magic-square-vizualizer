export const C_CODE_SNIPPETS = [
	{
		id: "init",
		code: "int row = 0; int col = size / 2",
		description: "Инициализация начальной позиции в середине первой строки",
	},
	{
		id: "write",
		code: "matrix[row][col] = number",
		description: "Записываем текущее число в ячейку матрицы",
	},
	{
		id: "save",
		code: "int current_row = row; int current_col = col",
		description: "Сохраняем текущую позицию на случай запасного хода",
	},
	{
		id: "move",
		code: "row = row - 1; col = col + 1",
		description: "Двигаемся по диагонали: вверх и вправо",
	},
	{
		id: "check_top",
		code: "if (row < 0) row = size - 1",
		description: "Если вышли сверху - переходим в нижнюю строку",
	},
	{
		id: "check_right",
		code: "if (col >= size) col = 0",
		description: "Если вышли справа - переходим в левый столбец",
	},
	{
		id: "check_occupied",
		code: "if (matrix[row][col] != 0)",
		description: "Проверяем не занята ли новая ячейка",
	},
	{
		id: "backup",
		code: "row = current_row + 1; col = current_col",
		description: "Ячейка занята! Двигаемся вниз от сохраненной позиции",
	},
	{
		id: "check_bottom",
		code: "if (row >= size) row = 0",
		description: "Если вышли снизу - переходим в верхнюю строку",
	},
];
