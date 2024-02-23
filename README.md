# cs467-email-viz

Project for CS 467: Social Visualization, Spring 2024. 

## Design Project 1: Visualizing email reply times

### Python requirements

```
pip install -r requirements.txt
```

### Downloading the dataset:

Run in this folder:
 
```
wget https://www.cs.cmu.edu/~enron/enron_mail_20150507.tar.gz -P data/
tar -xf data/enron_mail_20150507.tar.gz -C data/
```

Now the data is in the `data/` folder! 

** The `data/` folder is not to be committed to github! ** 

### Filesystem setup

Make a folder for the processed data

```
mkdir -p processed_data
```

### Create csvs of users. 

Convert the .ipynb to a friendly, executable python file:

```
jupyter nbconvert --to python clean_data.ipynb 
```

Feel free to use any users, but we have chosen a few as well. Run all (or any subset) of the following lines:

```
python3 clean_data.py allen-p
python3 clean_data.py arnold-j
python3 clean_data.py bass-e
python3 clean_data.py weldon-v
python3 clean_data.py weldon-c
python3 clean_data.py geaccone-t
python3 clean_data.py sturm-j
python3 clean_data.py scott-s
python3 clean_data.py mckay-b
```

### Create full data csv

``` 
jupyter nbconvert --to python analysis.ipynb
python3 analysis.py
```

### Open the visualization

Open `index.html` in the `visualization/` folder. 
