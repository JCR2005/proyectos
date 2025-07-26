#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class Canvas; // declaración anticipada

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void limpiarDibujo();

private:
    Ui::MainWindow *ui;
    Canvas* canvas;  // área de dibujo personalizada
};
#endif // MAINWINDOW_H
