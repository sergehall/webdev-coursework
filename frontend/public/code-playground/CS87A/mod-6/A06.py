#
# Name : Siarhei Hancharou
# Assignment #: 6
# Submission Date : 12/17/2020
#
# Description of program "Visualization and UI for Data Analysis.":
# class President, class House, create_president_dict(), create_house_dict(),
# state_breakdown(house_dict) taken from the previous "assignment A05".
# Creating a class "class MyGUI" executing Assignment 6.
# Starting the program opens the main window. At the top of which
# there are radio Radiobutton that respond to what data will be
# displayed on the Canvas. Below  Radiobutton are two entries
# in which the user enters the year and state. Then there is an
# empty space Canvas, in which after clicking button "Show graph"
#  a graph and description are displayed.
# There are also buttons at the bottom of the main window:
# button "Clear" - it clears the canvas, but it actually closes that window
# and creates a new one.
# button "Quit" - closes the window and ends the program.

import tkinter as tk
from tkinter import messagebox


class President:
    def __init__(self, year, state, state_po, state_fips, state_cen,
                 state_ic, office, candidate, party, writein, candidatevotes,
                 totalvotes, version, notes):
        self.__year = year
        self.__state = state
        self.__state_po = state_po
        self.__state_fips = state_fips
        self.__state_cen = state_cen
        self.__state_ic = state_ic
        self.__office = office
        self.__candidate = candidate
        self.__party = party
        self.__writein = writein
        self.__candidatevotes = candidatevotes
        self.__totalvotes = totalvotes
        self.__version = version
        self.__notes = notes

    # accessor
    def get_year(self):
        return self.__year

    def get_state(self):
        return self.__state

    def get_state_po(self):
        return self.__state_po

    def get_state_fips(self):
        return self.__state_fips

    def get_state_cen(self):
        return self.__state_cen

    def get_state_ic(self):
        return self.__state_ic

    def get_office(self):
        return self.__office

    def get_candidate(self):
        return self.__candidate

    def get_party(self):
        return self.__party

    def get_writein(self):
        return self.__writein

    def get_candidatevotes(self):
        return self.__candidatevotes

    def get_totalvotes(self):
        return self.__totalvotes

    def get_version(self):
        return self.__version

    def get_notes(self):
        return self.__notes

    # mutator

    def set_year(self, year):
        self.__year = year

    def set_state(self, state):
        self.__state = state

    def set_state_po(self, state_po):
        self.__state_po = state_po

    def set_state_fips(self, state_fips):
        self.__state_fips = state_fips

    def set_state_cen(self, state_cen):
        self.__state_cen = state_cen

    def set_state_ic(self, state_cen):
        self.__state_ic = state_cen

    def set_office(self, office):
        self.__office = office

    def set_candidate(self, candidate):
        self.__candidate = candidate

    def set_party(self, party):
        self.__party = party

    def set_writein(self, writein):
        self.__writein = writein

    def set_candidatevotes(self, candidatevotes):
        self.__candidatevotes = candidatevotes

    def set_totalvotes(self, totalvotes):
        self.__totalvotes = totalvotes

    def set_version(self, version):
        self.__version = version

    def set_notes(self, notes):
        self.__notes = notes

    def __str__(self):
        return self.__year + ", " + \
               self.__state + ", " + \
               self.__state_po + ", " + \
               self.__state_fips + ", " + \
               self.__state_cen + ", " + \
               self.__state_ic + ", " + \
               self.__office + ", " + \
               self.__candidate + ", " + \
               self.__party + ", " + \
               self.__writein + ", " + \
               self.__candidatevotes + ", " + \
               self.__totalvotes + ", " + \
               self.__version + ", " + \
               self.__notes + ". "


class House:
    def __init__(self, year, state, state_po, state_fips, state_cen,
                 state_ic, office, district, stage, runoff, special,
                 candidate, party, writein, mode, candidatevotes,
                 totalvotes, unofficial, version):
        self.__year = year
        self.__state = state
        self.__state_po = state_po
        self.__state_fips = state_fips
        self.__state_cen = state_cen
        self.__state_ic = state_ic
        self.__office = office
        self.__district = district
        self.__stage = stage
        self.__runoff = runoff
        self.__special = special
        self.__candidate = candidate
        self.__party = party
        self.__writein = writein
        self.__mode = mode
        self.__candidatevotes = candidatevotes
        self.__totalvotes = totalvotes
        self.__unofficial = unofficial
        self.__version = version

    # accessor
    def get_year(self):
        return self.__year

    def get_state(self):
        return self.__state

    def get_state_po(self):
        return self.__state_po

    def get_state_fips(self):
        return self.__state_fips

    def get_state_cen(self):
        return self.__state_cen

    def get_state_ic(self):
        return self.__state_ic

    def get_office(self):
        return self.__office

    def get_district(self):
        return self.__district

    def get_stage(self):
        return self.__stage

    def get_runoff(self):
        return self.__runoff

    def get_special(self):
        return self.__special

    def get_candidate(self):
        return self.__candidate

    def get_party(self):
        return self.__party

    def get_writein(self):
        return self.__writein

    def get_mode(self):
        return self.__mode

    def get_candidatevotes(self):
        return self.__candidatevotes

    def get_totalvotes(self):
        return self.__totalvotes

    def get_unofficial(self):
        return self.__unofficial

    def get_version(self):
        return self.__version

    # mutator

    def set_year(self, year):
        self.__year = year

    def set_state(self, state):
        self.__state = state

    def set_state_po(self, state_po):
        self.__state_po = state_po

    def set_state_fips(self, state_fips):
        self.__state_fips = state_fips

    def set_state_cen(self, state_cen):
        self.__state_cen = state_cen

    def set_state_ic(self, state_cen):
        self.__state_ic = state_cen

    def set_office(self, office):
        self.__office = office

    def set_district(self, district):
        self.__district = district

    def set_stage(self, stage):
        self.__stage = stage

    def set_runoff(self, runoff):
        self.__runoff = runoff

    def set_special(self, special):
        self.__special = special

    def set_candidate(self, candidate):
        self.__candidate = candidate

    def set_party(self, party):
        self.__party = party

    def set_writein(self, writein):
        self.__writein = writein

    def set_mode(self, mode):
        self.__mode = mode

    def set_candidatevotes(self, candidatevotes):
        self.__candidatevotes = candidatevotes

    def set_totalvotes(self, totalvotes):
        self.__totalvotes = totalvotes

    def set_unofficial(self, unofficial):
        self.__unofficial = unofficial

    def set_version(self, version):
        self.__version = version

    def __str__(self):
        return self.__year + ", " + \
               self.__state + ", " + \
               self.__state_po + ", " + \
               self.__state_fips + ", " + \
               self.__state_cen + ", " + \
               self.__state_ic + ", " + \
               self.__office + ", " + \
               self.__district + ", " + \
               self.__stage + ", " + \
               self.__runoff + ", " + \
               self.__special + ", " + \
               self.__candidate + ", " + \
               self.__party + ", " + \
               self.__writein + ", " + \
               self.__mode + ", " + \
               self.__candidatevotes + ", " + \
               self.__totalvotes + ", " + \
               self.__unofficial + ", " + \
               self.__version + ". "


def create_president_dict():
    # Open and read the file.
    content_list_president_dirty = []
    president = open("president.tab", "r")
    content = president.readlines()
    president.close()

    # Read the content and divide it by tab.
    for i in content:
        content_list_president_dirty.append(i.split("\t"))

    # Clearing the list of special characters.
    list_president = []
    for i in content_list_president_dirty:
        i.pop(-1)
        temp = []
        for j in i:
            temp.append(j.rstrip())
        list_president.append(temp)

    # Small changes in the data and too long names
    # of the candidates also had to shorten the name of the party.
    content_list_president = []
    for i in list_president:
        t_in = []
        for j in i:
            if len(i[8]) > 20:
                n = j[:20]
                t_in.append(n)
            # To better display the data for all empty spaces
            # in the list to be signed as there is "No data".
            # Rather, it was an attempt, but there were many such names.
            # I'll just display a cropped line.
            elif j == "":
                j = "No data"
                t_in.append(j)

            else:
                t_in.append(j)
        content_list_president.append(t_in)

    similar_unit_for_list = []

    for ch in range(len(content_list_president)):
        # Checking the last element.
        if ch == len(content_list_president) - 1:
            # if this object is equal to the previous one add
            # in previous list, if then different the new
            # dictionary object is different.
            if content_list_president[ch][:2] == \
                    content_list_president[ch - 1][:2]:
                similar_unit_for_list[-1] = similar_unit_for_list[-1] + \
                                            [content_list_president[ch]]

        elif content_list_president[ch][:2] == \
                content_list_president[ch - 1][:2]:
            similar_unit_for_list[-1] = similar_unit_for_list[-1] + \
                                        [content_list_president[ch]]

        else:
            similar_unit_for_list.append([content_list_president[ch]])

    # Creating a dictionary in which the tuple (year and state) is the key,
    # and the list with nested objects will be the value.
    president_dict = {}
    for i in similar_unit_for_list:

        key = tuple([i[0][0], i[0][1]])
        value = []
        for ch in i:
            # Class attribute(year, state, state_po, state_fips, state_cen,
            # state_ic, office, candidate, party, writein, candidatevotes,
            # totalvotes, version, notes)
            value.append(President(ch[0], ch[1], ch[2],
                                   ch[3], ch[4], ch[5],
                                   ch[6], ch[7], ch[8],
                                   ch[9], ch[10], ch[11],
                                   ch[12], ch[13]))

        # president_dict[key] = value
        # In the read house. tab, 8 lines were scattered, and this
        # cycle  was added to correctly collect all the data
        # for a certain year and state.
        if key in president_dict:
            president_dict[key] = president_dict[key] + value
            continue

        president_dict[key] = value

    return president_dict


def create_house_dict():
    # Open and read the file.
    content_list_house_dirty = []
    house = open("house.tab", "r")
    content = house.readlines()
    house.close()

    # Read the content and divide it by tab.
    for i in content:
        content_list_house_dirty.append(i.split("\t"))

    # Clearing the list of special characters.
    content_list_house = []
    for i in content_list_house_dirty:
        n = []
        for j in i:
            n.append(j.rstrip())
        content_list_house.append(n)

    # Compare the list by the first two elements year and state.
    # Creating a list with nested lists of the same year.
    similar_unit_for_dic = []
    # Checking the last element.
    for ch in range(len(content_list_house)):
        if ch == len(content_list_house) - 1:
            if content_list_house[ch][:2] == \
                    content_list_house[ch - 1][:2]:
                similar_unit_for_dic[-1] = similar_unit_for_dic[-1] + \
                                           [content_list_house[ch]]

        elif content_list_house[ch][:2] == \
                content_list_house[ch - 1][:2]:
            similar_unit_for_dic[-1] = similar_unit_for_dic[-1] + \
                                       [content_list_house[ch]]

        else:
            similar_unit_for_dic.append([content_list_house[ch]])

    # Creating a dictionary in which the tuple (year and state) is the key,
    # and the list with nested objects will be the value.
    house_dict = {}
    for i in similar_unit_for_dic:
        key = tuple([i[0][0], i[0][1]])
        value = []

        for ch in i:
            # Class attribute(year, state, state_po, state_fips,
            # state_cen, state_ic, office, district, stage,
            # special, runoff, candidate, party, writein, mode,
            # candidatevotes, totalvotes, unofficial, version)
            value.append(House(ch[0], ch[1], ch[2],
                               ch[3], ch[4], ch[5],
                               ch[6], ch[7], ch[8],
                               ch[9], ch[10], ch[11],
                               ch[12], ch[13], ch[14],
                               ch[15], ch[16], ch[17],
                               ch[18]))

        # In the read house. tab, 8 lines were scattered, and this
        # cycle  was added to correctly collect all the data
        # for a certain year and state.
        if key in house_dict:
            house_dict[key] = house_dict[key] + value
            continue

        house_dict[key] = value

    return house_dict


def state_breakdown(house_dict):
    # The main dictionary to which the processed data is
    # collected and returned by the function
    house_wins_by_party = {}
    # A sheet with keys that will be substituted in
    # the future in the loop to iterate through the elements.
    list_key = []
    for i in house_dict:
        if i == tuple(["year", "state"]):
            continue
        list_key.append(i)
    # I took the principle of searching for winners above,
    # but at the same time created a list of all years and
    # States (list_key), from which I took values and
    # substituted them into the loop.
    # Schematically, the dictionary will look like this
    # {("year", "state"): {"district": ('candidate', 'party', 'state',
    # 'candidatevotes'), "district2": ('candidate', 'party', 'state',
    # 'candidatevotes'}........{("year n", "state n"): {"district":
    # (candidate', 'party', 'state','candidatevotes'), ....."district n":
    # ('candidate', 'party', 'state', 'candidatevotes')}}

    # The temporary variable is reset to zero when moving
    # to the next item in the list.
    district = 0
    temp_max_votes = 0
    count_index = 0
    house_wins_by_party_temp = {}
    for i in range(len(list_key)):
        house_dictionary_with_wins = {}
        for j in house_dict[list_key[count_index]]:
            if int(j.get_district()) == int(district):
                if int(j.get_candidatevotes()) > int(temp_max_votes):
                    temp_max_votes = int(j.get_candidatevotes())
                    house_dictionary_with_wins. \
                        update({j.get_district(): (j.get_candidate(),
                                                   j.get_party(),
                                                   j.get_state(),
                                                   j.get_candidatevotes())})

            else:
                temp_max_votes = 0
                district = int(j.get_district())
                if int(j.get_district()) == district:
                    if int(j.get_candidatevotes()) > int(temp_max_votes):
                        temp_max_votes = int(j.get_candidatevotes())
                        house_dictionary_with_wins. \
                            update({j.get_district(): (j.get_candidate(),
                                                       j.get_party(),
                                                       j.get_state(),
                                                       j.get_candidatevotes())})

        house_wins_by_party_temp.update({list_key[count_index]:
                                             house_dictionary_with_wins})
        count_index += 1
    # This loop iterates through the dictionary and counts the total
    # number of each party in a particular year and state
    for i in house_wins_by_party_temp:
        temp = {}
        democrat = 0
        republican = 0
        other = 0
        for j in house_wins_by_party_temp[i]:
            key = house_wins_by_party_temp[i][j][1]
            if key == "republican" or key == "re" or \
                    key == "independent-republican":
                republican += 1

            elif key == "democrat" or key == "national democrat" or \
                    key == "regular democracy" or key == "democratic-npl" or \
                    key == "foglietta (democrat)":
                democrat += 1

            else:
                other += 1

        temp["Democrat"] = democrat
        temp["Republican"] = republican
        temp["Other"] = other
        # Changing the type of the null index in the key,
        # as specified in the task.
        i = tuple([int(i[0]), i[1]])

        house_wins_by_party.update({i: temp})

    return house_wins_by_party


class MyGUI:
    # initiate two dictionaries. Since for the graph we will need data from
    # these dictionary.
    def __init__(self, president_dict, state_breakdown_dict):
        self.__president_dict = president_dict
        self.__state_breakdown_dict = state_breakdown_dict

        # Create the main window.
        self.main_window = tk.Tk()
        self.main_window["bg"] = "gray90"
        self.main_window.geometry('370x590')
        self.main_window.title("Visualization and UI for Data Analysis")

        # # Create a Canvas in which the graph will be drawn.
        self.__CANVAS_WIDTH = 350  # Canvas WIDTH
        self.__CANVAS_HEIGHT = 300  # Canvas HEIGHT
        self.__X1 = 30  # top left x coordinate of the rectangle
        self.__Y1 = 10  # Upper-left Y of  bounding rectangle
        self.__X2 = 320  # lower right x coordinate of the rectangle
        self.__Y2 = 290  # lower right coordinate of the rectangle

        # Create a Canvas interface element.
        self.canvas_frame = tk.Frame(self.main_window)
        self.canvas = tk.Canvas(self.canvas_frame,
                                width=self.__CANVAS_WIDTH,
                                height=self.__CANVAS_HEIGHT)
        self.canvas["bg"] = "gray90"

        # # Create a Frame that will be under the Canvas and will display
        # information that complements the graph.
        self.middle_frame_t = tk.Frame(self.main_window)
        self.middle_frame_d = tk.Frame(self.main_window)
        self.middle_frame_r = tk.Frame(self.main_window)
        self.middle_frame_o = tk.Frame(self.main_window)

        # place the main window in the middle of the current screen
        self.main_window.update_idletasks()
        s = self.main_window.geometry()
        s = s.split('+')
        s = s[0].split('x')
        width_root = int(s[0])
        height_root = int(s[1])

        w = self.main_window.winfo_screenwidth()
        h = self.main_window.winfo_screenheight()
        w = w // 2
        h = h // 2
        w = w - width_root // 2
        h = h - height_root // 2
        self.main_window.geometry('+{}+{}'.format(w, h))

        # Frame that prompts the user to select the Radiobutton button option.
        self.top_frame = tk.Frame(self.main_window)
        self.top_frame["bg"] = "gray90"
        tk.Label(self.top_frame,
                 text="Choose which chart to draw",
                 justify=tk.LEFT,
                 padx=20,
                 font="Times 17",
                 bg="rosy brown",
                 relief=tk.GROOVE,
                 width=45).pack()

        self.top_frame.pack(fill=None, expand=False)

        #  Create Radiobutton buttons and assign each one its own
        # integer and unique number, which will later affect
        # the year_state() function that draws the graph.
        self.r_b_frame = tk.Frame(self.main_window)
        self.r_b_frame["bg"] = "gray90"
        self.radio_var = tk.IntVar()
        self.radio_var.set(1)

        rb = [("Percent of Popular vote.", 1),
              ("Party affiliation House of Representatives.", 2)]

        for name, val in rb:
            tk.Radiobutton(self.r_b_frame,
                           text=name,
                           padx=20,
                           variable=self.radio_var,
                           value=val,
                           font="Times 17",
                           bg="gray90",
                           cursor="circle").pack(anchor=tk.W)

        self.year_frame_up = tk.Frame(self.main_window, width=430, height=6,
                                      relief='raised', borderwidth=3)

        # Сreate a frames where to place the year and state , entry and
        # labels of each
        self.year_frame = tk.Frame(self.main_window)
        self.year_frame["bg"] = "gray90"
        self.state_frame = tk.Frame(self.main_window)
        self.state_frame["bg"] = "gray90"
        self.bottom_frame = tk.Frame(self.main_window, relief='raised',
                                     borderwidth=2)
        self.bottom_frame["bg"] = "gray90"

        self.year_entry = tk.Entry(self.year_frame, width=10)
        self.year_label = tk.Label(self.year_frame,
                                   text="Enter Year 1976 -2016.   "
                                        "            ",
                                   font="Times 19",
                                   bg="gray90")

        self.year_entry.pack(side="left")
        self.year_label.pack(side="left")

        self.state_entry = tk.Entry(self.state_frame, width=10)
        self.state_label = tk.Label(self.state_frame, text="Enter State."
                                                           "                 "
                                                           "                 ",
                                    font="Times 19",
                                    bg="gray90")
        self.state_entry.pack(side="left")
        self.state_label.pack(side="left")

        self.state_frame_down = tk.Frame(self.main_window, width=430,
                                         height=6,
                                         relief='raised', borderwidth=3)

        # Creating buttons "clear" , "show graph", and "quit".
        self.new_search_button = tk.Button(self.bottom_frame,
                                           text="    Clear    ",
                                           fg="green4",
                                           font='Times 19',
                                           command=self.new_search)

        # Calls the year_state function, which draws a graph.
        self.show_button = tk.Button(self.bottom_frame,
                                     text=" Show graph ",
                                     fg="green4",
                                     font='Times 19',
                                     command=self.year_state)

        # Binding keyboard event, after clicking, it changes color fg=.
        self.show_button.bind('<Button>', self.change)

        # The destroy() method destroys self.main_window widget.
        self.quit_button = tk.Button(self.bottom_frame,
                                     text=" Quit ",
                                     fg="red",
                                     font='Times 19',
                                     command=self.main_window.destroy)

        self.new_search_button.pack(side="left")
        self.show_button.pack(side="left")
        self.quit_button.pack(side="left")

        # We organize the widgets in the order we need using
        # Tkinter pack() method.
        self.canvas.pack()
        self.top_frame.pack()
        self.r_b_frame.pack()
        self.year_frame_up.pack()
        self.year_frame.pack()
        self.state_frame.pack()
        self.state_frame_down.pack()
        self.canvas_frame.pack()
        self.middle_frame_d.pack()
        self.middle_frame_r.pack()
        self.middle_frame_o.pack()
        self.middle_frame_t.pack()
        self.bottom_frame.pack(side="bottom")

        tk.mainloop()

    # Сreate create_arc() depending on the value of the variable
    # self.radio_var.get() graph "percentage of votes" or " party
    # affiliation of the house of representatives.
    def year_state(self):

        radio_b = self.radio_var.get()

        if radio_b == 1:
            year = self.year_entry.get()
            state = self.state_entry.get()
            dict_y_s = {}
            dict_y_s_nest = {}
            tot_votes_y_s = 0
            count = 0
            count_other = 0
            #  check the dictionary self.__president_dict by key (year, state),
            #  process the found values and create a new dictionary
            #  dict_y_s[totalvotes] = {'democrat': 'candidatevotes',
            #  'republican': 'candidatevotes', 'other': candidatevotes}
            if (year, state) in self.__president_dict:
                for i in self.__president_dict[(year, state)]:
                    if count < 2:
                        dict_y_s_nest[
                            i.get_party()] = i.get_candidatevotes()
                        tot_votes_y_s = i.get_totalvotes()
                        count += 1
                    else:
                        count_other += int(i.get_candidatevotes())

                dict_y_s_nest["other"] = count_other
                dict_y_s.update({tot_votes_y_s: dict_y_s_nest})

            total = 0
            d_votes = 0
            r_votes = 0
            o_votes = 0
            for i in dict_y_s:
                total = i
                for j in dict_y_s[i]:

                    if j == "democrat":
                        d_votes = dict_y_s[i][j]

                    elif j == "republican":
                        r_votes = dict_y_s[i][j]

                    elif j == "other":
                        o_votes = dict_y_s[i][j]
            one = 0
            two = 0
            fill_1 = ""
            fill_2 = ""

            if d_votes > r_votes:
                one = float(d_votes) / float(total) * 360
                two = float(r_votes) / float(total) * 360
                fill_1 = "blue"
                fill_2 = "red"

            if r_votes > d_votes:
                one = float(r_votes) / float(total) * 360
                two = float(d_votes) / float(total) * 360
                fill_1 = "red"
                fill_2 = "blue"
            try:
                incr_two = one + two
                three = float(o_votes) / float(total) * 360

                start_point = 0
                self.canvas.create_arc(self.__X1, self.__Y1,
                                       self.__X2, self.__Y2,
                                       start=start_point,
                                       extent=one,
                                       fill=fill_1)

                self.canvas.create_arc(self.__X1, self.__Y1,
                                       self.__X2, self.__Y2,
                                       start=one,
                                       extent=two,
                                       fill=fill_2)

                self.canvas.create_arc(self.__X1, self.__Y1,
                                       self.__X2, self.__Y2,
                                       start=incr_two,
                                       extent=three,
                                       fill="green")

                d = float(d_votes) / float(total)
                r = float(r_votes) / float(total)
                o = float(o_votes) / float(total)
                d = str(round(d * 100, 2))
                r = str(round(r * 100, 2))
                o = str(round(o * 100, 2))

                self.note_label_d = tk.Label(self.middle_frame_d,
                                             text="  Democrat = " + d + "%",
                                             font='Times 15',
                                             fg="blue")
                self.note_label_d["bg"] = "gray90"
                self.note_label_r = tk.Label(self.middle_frame_r,
                                             text="Republican = " + r + "%",
                                             font='Times 15',
                                             fg="red")
                self.note_label_r["bg"] = "gray90"
                self.note_label_o = tk.Label(self.middle_frame_o,
                                             text="      Other = " + o + "%",
                                             font='Times 15',
                                             fg="green")
                self.note_label_o["bg"] = "gray90"
                self.note_label_d.pack()
                self.note_label_r.pack(side="left")
                self.note_label_o.pack(side="left")

            # If the data is entered incorrectly or the entry is empty,
            # an exception occurs, added tk. messagebox.show error ()
            # notifies the user about an error in the entered data
            except ZeroDivisionError:
                tk.messagebox.showerror(title="Error",
                                        message="Check the entered data")

                print("Entered the wrong year or state, or blank\n"
                      "lines or incorrect characters. radio_b == 1")

        if radio_b == 2:
            year = self.year_entry.get()
            state = self.state_entry.get()

            # We get a dictionary of this dict_y_s[(year, state)] = {
            # 'Democrat': number, 'Republican': number, 'Other': number}}
            dict_y_s = {}
            if year.isdigit():
                if (int(year), state) in self.__state_breakdown_dict:
                    dict_y_s[(year, state)] = \
                        self.__state_breakdown_dict[
                            (int(year), state)]
            d_votes = 0
            r_votes = 0
            o_votes = 0

            for i in dict_y_s:
                for j in dict_y_s[i]:
                    if j.lower() == "democrat":
                        d_votes = dict_y_s[i][j]

                    elif j.lower() == "republican":
                        r_votes = dict_y_s[i][j]

                    elif j.lower() == "other":
                        o_votes = dict_y_s[i][j]

            total = d_votes + r_votes + o_votes
            one = 0
            two = 0
            fill_1 = ""
            fill_2 = ""

            if d_votes > r_votes:
                one = int(d_votes) / int(total) * 360
                two = int(r_votes) / int(total) * 360
                fill_1 = "blue"
                fill_2 = "red"

            if r_votes > d_votes:
                one = int(r_votes) / int(total) * 360
                two = int(d_votes) / int(total) * 360
                fill_1 = "red"
                fill_2 = "blue"
            try:
                incr_two = one + two
                three = int(o_votes) / int(total) * 360

                start_point = 0

                self.canvas.create_arc(self.__X1, self.__Y1,
                                       self.__X2, self.__Y2,
                                       start=start_point,
                                       extent=one,
                                       fill=fill_1)

                self.canvas.create_arc(self.__X1, self.__Y1,
                                       self.__X2, self.__Y2,
                                       start=one,
                                       extent=two,
                                       fill=fill_2)

                self.canvas.create_arc(self.__X1, self.__Y1,
                                       self.__X2, self.__Y2,
                                       start=incr_two,
                                       extent=three,
                                       fill="green")

                self.note_label_d = tk.Label(self.middle_frame_d,
                                             text="   Democrat = " +
                                                  str(d_votes) + " votes.",
                                             font='Times 15',
                                             fg="blue")
                self.note_label_d["bg"] = "gray90"

                self.note_label_r = tk.Label(self.middle_frame_r,
                                             text="Republican = "
                                                  + str(
                                                 r_votes) + " votes.",
                                             font='Times 15',
                                             fg="red")
                self.note_label_r["bg"] = "gray90"

                self.note_label_o = tk.Label(self.middle_frame_o,
                                             text="       Other = "
                                                  + str(
                                                 o_votes) + " votes.",
                                             font='Times 15',
                                             fg="green")
                self.note_label_o["bg"] = "gray90"

                self.note_label_t = tk.Label(self.middle_frame_t,
                                             text="Total votes = "
                                                  + str(total) + " votes.",
                                             font='Times 15')
                self.note_label_t["bg"] = "gray90"

                self.note_label_d.pack(side="left")
                self.note_label_r.pack(side="left")
                self.note_label_o.pack(side="left")
                self.note_label_t.pack(side="left")

            # If the data is entered incorrectly or the entry is empty,
            # an exception occurs, added tk. messagebox.show error ()
            # notifies the user about an error in the entered data
            except ZeroDivisionError:
                tk.messagebox.showerror(title="Error",
                                        message="Check the entered data")

                print("Entered the wrong year or state, or\n"
                      "blank lines or incorrect characters. radio_b == 2")

    # The function changes the color of the "self.show_button"
    # button after it is clicked.
    def change(self, event):
        self.show_button['fg'] = "black"
        self.show_button['activeforeground'] = "black"

    # Closes the current MyGUI and creates a new one.
    # Called at the command of the button "self.quit_button".
    def new_search(self):
        self.main_window.destroy()
        my_new_gui = MyGUI(president_dictionary, state_breakdown_dict)


# Creating dictionaries president_dictionary, house_dictionary,
# state_breakdown_dict
president_dictionary = create_president_dict()
house_dictionary = create_house_dict()
state_breakdown_dict = state_breakdown(house_dictionary)

# Creating our MyGUI.
my_gui = MyGUI(president_dictionary, state_breakdown_dict)
