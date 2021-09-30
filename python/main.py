# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import os
import tkinter
import tkinter.messagebox
from tkinter.filedialog import askopenfilenames


def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.

def getSqlList(file_path):
    sql_list = []
    sql = ''
    print(file_path)
    with open(file_path, "r", encoding='utf-8') as f:
        sqlMode = 0  # 0--not sql; 1--one line sql; 2--multiline sql
        for line in f.readlines():
            #line = line.strip('\n')  # 去掉列表中每一个元素的换行符
            line = line.lower()

            if sqlMode == 2:  # multiline sql
                if line.find('from ') == 0 or \
                        line.find('where ') == 0 or \
                        line.find('join ') == 0 or \
                        line.find('left join ') == 0 or \
                        line.find('right join ') == 0 or \
                        line.find('order by ') == 0 or \
                        line.find('inner join ') == 0 or \
                        line.find('group by ') == 0:
                    sql+= line
                else:
                    #print('======================================================================================')
                    #print(sql)
                    sql_list.append(sql)
                    sql = ''
                    sqlMode = 0
            if sqlMode == 0:
                if line.find('select ') >= 0:  # SQL
                    line = line[line.find('select '):]
                    if line.find(' from ') >= 0:  # one line sql
                        #print('======================================================================================')
                        #print(line)
                        sql_list.append(line)
                    else:  # multiline sql
                        sql = line
                        sqlMode = 2

    return sql_list


def getTableCount(sql_list):
    tableCountMap = {}
    for sql in sql_list:
        sub = sql[sql.find('from ') : ]

        index = sub.find(' t_')
        while index != -1:

            if sub[index+1:].find(' ') == -1:
                table = sub[index+1:].rstrip('\n')
                sub = table
            else:
                table = sub[index+1:sub[index+1:].find(' ')+index+1].rstrip('\n')
                sub = sub[sub[index+1:].find(' ')+index+1:]

            if tableCountMap.get(table):
                tableCountMap[table] = tableCountMap.get(table) + 1
            else:
                tableCountMap[table] = 1

            index = sub.find(' t_')

    return tableCountMap


def getSqlCount(sql_list):
    sqlMap = {}
    for sql in sql_list:
        if sqlMap.get(sql):
            sqlMap[sql] = sqlMap.get(sql) + 1
        else:
            sqlMap[sql] = 1

    return sqlMap


# Press the green button in the gutter to run the script.
if __name__ == '__main__':

    ################################################################################################
    #                               以下为GUI
    ################################################################################################
    root = tkinter.Tk()

    ##主窗口大小
    root.minsize(500, 500)
    root.maxsize(600, 600)
    root.title('monitor counter')

    # first frame
    frame3 = tkinter.Frame(root)
    frame3.grid(row=0, column=0, sticky='w')  # sticky='w'指定了组件在单元格中靠左对齐

    lb3_0 = tkinter.Label(frame3, text=' ')
    lb3_0.pack(side='left')
    btn_monitor_file = tkinter.Button(frame3, text='选择monitor log', command=lambda: on_btn_monitor_file())
    btn_monitor_file.pack(side='left')

    lb3_2 = tkinter.Label(frame3, text=' ')  # 占位
    lb3_2.pack(side='left')
    str_monitor_source = tkinter.StringVar()  # 显示已选的文件
    str_monitor_source.set('')
    lb_monitor_file = tkinter.Label(frame3, textvariable=str_monitor_source)  # 显示已选的文件
    lb_monitor_file.pack(side='left')

    # 占位
    frame0 = tkinter.Frame(root)
    frame0.grid(row=1, column=0, sticky='w')  # sticky='w'指定了组件在单元格中靠左对齐

    lb04_1 = tkinter.Label(frame0, text=' ')
    lb04_1.pack(side='left')

    # 生成第五组控件的容器，
    frame5 = tkinter.Frame(root)
    frame5.grid(row=2, column=0, sticky='w')  # sticky='w'指定了组件在单元格中靠左对齐

    lb5_0 = tkinter.Label(frame5, text=' ')  # 占位
    lb5_0.pack(side='left')
    btn_count = tkinter.Button(frame5, text='统计', bg='yellow', command=lambda: on_btn_count())
    btn_count.pack(side='left')

    lb8 = tkinter.Label(frame5, text=' reslut file: ')  # 占位
    lb8.pack(side='left')
    str_result = tkinter.StringVar()  # 显示已选的文件
    str_result.set('')
    lb_result = tkinter.Label(frame5, textvariable=str_result)  # 显示已选的文件
    lb_result.pack(side='left')
    def on_btn_monitor_file():
        global str_monitor_source
        monitor_files = askopenfilenames(filetypes=[('txt', '*.txt')])

        # 将xmind文件名显示在界面label
        str_monitor_source.set(monitor_files[0])


    def on_btn_count():
        global str_monitor_source
        global str_result

        str_result.set('')

        if str_monitor_source.get() == '':
            tkinter.messagebox.showinfo('提示', '请选择monitor log')
        else:
            lst = getSqlList(str_monitor_source.get())
            a = sorted(getTableCount(lst).items(), key=lambda kv: (kv[1], kv[0]), reverse=True)
            al = ['##### count table:\n']
            for k in a:
                al.append('访问 ' + str(k[1]) + ' 次 ----- ' + k[0] + '\n')

            b = sorted(getSqlCount(lst).items(), key=lambda kv: (kv[1], kv[0]), reverse=True)
            bl = ['\n##### count sql:\n']
            for k in b:
                bl.append('重复 ' + str(k[1]) + ' 次 ----- ' + k[0] + '\n')

            path_file_name = str_monitor_source.get()
            path_file_name = path_file_name[:path_file_name.rfind('/') + 1]+'result.txt'
            #path_file_name = 'E:\\trace\\凭证\\result.txt'
            if os.path.exists(path_file_name):
                os.remove(path_file_name)

            with open(path_file_name, "a") as f:
                f.write(str_monitor_source.get() + ' \n\n')
                f.writelines(al)
                f.writelines(bl)

            str_result.set(path_file_name)
            osCommandString = "notepad.exe " + path_file_name
            os.system(osCommandString)


    root.mainloop()


# See PyCharm help at https://www.jetbrains.com/help/pycharm/
