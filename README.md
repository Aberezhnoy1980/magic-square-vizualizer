# Продвинутый дебагер с визуализатором для изучения работы циклов и массивов на примере задачи п построению магического квадрата

## Условия задачи:

Заполнить квадратную матрицу числами таким образом, что бы суммы строк, столбцов и диагоналей были равны между собой. Числа уникальны для всей матрицы.

## Принятые допущения:

Числа упорядочены и последовательны от 1
Рассматрвается матрица с нечетной размемрностью (алгоритм Сиамского метода (метод де ла Лубера))

## Исходный код на c (самый простой вариант)

```c
#include <stdio.h>

void printMatrix(int matrixSize, int matrix[matrixSize][matrixSize]);

void fillMagicSquare(int matrixSize, int matrix[matrixSize][matrixSize]);

void algorithmSiamMethod(int matrixSize)
{
    int magicSquare[matrixSize][matrixSize];
    int sum = matrixSize * matrixSize * (matrixSize * matrixSize + 1) / 2 / matrixSize;

    for (int i = 0; i < matrixSize; i++)
    {
        for (int j = 0; j < matrixSize; j++)
        {
            magicSquare[i][j] = 0;
        }
    }

    fillMagicSquare(matrixSize, magicSquare);

    printMatrix(matrixSize, magicSquare);
}

void printMatrix(int matrixSize, int matrix[matrixSize][matrixSize])
{
    printf("\nМатрица %dx%d:\n", matrixSize, matrixSize);
    for (int i = 0; i < matrixSize; i++)
    {
        for (int j = 0; j < matrixSize; j++)
        {
            printf("%3d ", matrix[i][j]);
        }
        printf("\n");
    }
}

void fillMagicSquare(int matrixSize, int matrix[matrixSize][matrixSize])
{
    int currentRow = 0;
    int currentCol = matrixSize / 2;
    matrix[currentRow][currentCol] = 1;

    printf("Текущая позиция: Строка: %d, Столбец: %d\n", currentRow, currentCol);
    int newCol, newRow;

    for (int i = 2; i <= matrixSize * matrixSize; i++)
    {
        newRow = currentRow - 1;
        newCol = currentCol + 1;
      
        if (newRow < 0) {
            newRow = matrixSize - 1;
        }
        if (newCol >= matrixSize) {
            newCol = 0;
        }
        
        if (matrix[newRow][newCol] == 0) {
            currentRow = newRow;
            currentCol = newCol;
        } else {
            currentRow = (currentRow + 1) % matrixSize;
        }

        matrix[currentRow][currentCol] = i;
        printf("Запись элемента %d matrix[%d][%d]\n", i, currentRow, currentCol);
    }
}

int main()
{
    int matrixSize;
    printf("Введите размер массива: ");
    scanf("%d", &matrixSize);

    // Вызов функции основного алгоритма
    algorithmSiamMethod(matrixSize);

    return 0;
}
```

## В приложении рассматриваем в секции обзора кода оптимизированную (для удобства) версию метода fillMagicSquare:

```c
void fillMagicSquare(int number, int size, int matrix[size][size]) {
    int row = 0; int col = size / 2;
    matrix[row][col] = number;
    int current_row = row; int current_col = col;
    row = row - 1; col = col + 1;
    if (row < 0) row = size - 1;
    if (col >= size) col = 0;
    if (matrix[row][col] != 0);
    row = current_row + 1; col = current_col;
    if (row >= size) row = 0;
}
```

где <span>∀number ∈ [2, n<sup>2</sup>]</span>