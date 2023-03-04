# Plant Care- Shaurya (Rye), Sony and Adi

import time

numPlants = int(input("Number of plants that you have: "))
plants = []
for i in range(0, numPlants, 1):
    plantType = input("Name of a plant that you have: ")
    plants.append(plantType)

run = True

while run:
    numPlant = int(input("Which plant would you like to look at: "))
    plant = ""
    if(numPlant > len(plants) or numPlant < 0):
        print("Please input a proper number.")
    else:
        plant = plants[numPlant-1]

    if(plant == "X"):
        print("A warm climate suits your plant")

        reset = True

        while (reset == True):
            starttime = time.time()
            lasttime = starttime

            laptime = round((time.time() - lasttime), 2)
            totaltime = round((time.time() - starttime), 2)

            while(laptime < 5):
                reset = False
                laptime = round((time.time() - lasttime), 2)
                totaltime = round((time.time() - starttime), 2)
            else:
                print("Water Plant X.")
                reset = True
    elif(plant == "Y"):
        print("A cool climate suits your plant")
