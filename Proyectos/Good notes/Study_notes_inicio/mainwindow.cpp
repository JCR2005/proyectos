#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "canvas.h"

#include <QVBoxLayout>
#include <QPushButton>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    // Crear el área de dibujo
    canvas = new Canvas(this);

    // Crear botón de limpiar
    QPushButton* botonLimpiar = new QPushButton("Limpiar hoja");

    // Layout vertical
    QVBoxLayout* layout = new QVBoxLayout;
    layout->addWidget(canvas);
    layout->addWidget(botonLimpiar);

    // Insertar el layout en el widget central
    QWidget* central = new QWidget(this);
    central->setLayout(layout);
    setCentralWidget(central);

    // Conectar el botón
    connect(botonLimpiar, &QPushButton::clicked, this, &MainWindow::limpiarDibujo);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::limpiarDibujo()
{
    canvas->limpiar();
}
