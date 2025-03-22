from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib import messages
from .forms import SignupForm, LoginForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core.files.storage import default_storage


# Signup view: Handles user registration
def signup_view(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been created successfully! Please log in.')
            return redirect('login')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = SignupForm()
    return render(request, 'signup.html', {'form': form})

# Login view: Handles user authentication
def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(request, email=email, password=password)
            if user is not None:
                auth_login(request, user)  # Use auth_login to avoid shadowing
                if not form.cleaned_data['remember']:
                    request.session.set_expiry(0)  # Session expires on browser close
                messages.success(request, f'Welcome back, {user.full_name.split()[0]}!')
                return redirect('hero')
            else:
                messages.error(request, 'Invalid email or password.')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

# Logout view: Logs out the user
def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('hero')

# Hero view: Renders the homepage
def hero_view(request):
    return render(request, 'hero.html', {'user': request.user})

# Header view: Renders the header template
def header_view(request):
    return render(request, 'header.html')

# Footer view: Renders the footer template
def footer_view(request):
    return render(request, 'footer.html')

# About view: Renders the about page
def about(request):
    return render(request, 'about.html')

# Blog view: Renders the blog page
def blog(request):
    return render(request, 'blog.html')

# Contact view: Renders the contact page
def contact(request):
    return render(request, 'contact.html')

# Flexibility Core view: Renders the flexibility-core page
def flexibility_core(request):
    return render(request, 'flexibility-core.html')

# HILT Revolution view: Renders the hilt-revolution page
def hilt_revolution(request):
    return render(request, 'hilt-revolution.html')

# Login view (shadowed name): Renders the login page (consider renaming to avoid confusion)
def login(request):
    return render(request, 'login.html')

# Membership view: Renders the membership page
def membership(request):
    return render(request, 'membership.html')

# Purchase Achiever view: Renders the purchase-achiever page
def purchase_achiever(request):
    return render(request, 'purchase-achiver.html')  # Note: Typo in template name (achiver vs achiever)

# Purchase Basic view: Renders the purchase-basic page
def purchase_basic(request):
    return render(request, 'purchase-basic.html')

# Purchase Elite view: Renders the purchase-elite page
def purchase_elite(request):
    return render(request, 'purchase-Elite.html')  # Note: Inconsistent capitalization in template name

# Purchase Transformer view: Renders the purchase-transformer page
def purchase_transformer(request):
    return render(request, 'purchase-transformer.html')

# Services view: Renders the services page
def services(request):
    return render(request, 'services.html')

# Shop view: Renders the shop page
def shop(request):
    return render(request, 'shop.html')

# Ninety Days view: Renders the 90days page
def ninety_days(request):
    return render(request, '90days.html')

# Flexibility view: Renders the flexibility-core page (duplicate of flexibility_core)
def flexibility(request):
    return render(request, 'flexibility-core.html')

# HIIT Revolution view: Renders the hiit-revolution page (duplicate of hilt_revolution)
def hiit_revolution(request):
    return render(request, 'hiit-revolution.html')

# Trainer Booking view: Renders the trainer booking page
def trainer_booking(request):
    return render(request, 'trainer_booking.html')

@login_required
def user_dashboard(request):
    return render(request, 'dashboard.html')

@login_required
def update_profile(request):
    if request.method == 'POST':
        full_name = request.POST.get('full_name', '').strip()
        location = request.POST.get('location', '').strip()
        fitness_goal = request.POST.get('fitness_goal', '').strip()
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        profile_image = request.FILES.get('profile_image')

        user = request.user

        if not full_name:
            messages.error(request, "Full name is required.")
            return redirect('user_dashboard')

        # Update profile fields
        user.full_name = full_name
        user.location = location
        user.fitness_goal = fitness_goal

        # Handle password update
        if password and confirm_password:
            if password == confirm_password:
                user.set_password(password)
            else:
                messages.error(request, "Passwords do not match.")
                return redirect('user_dashboard')

        # Handle profile image upload
        if profile_image:
            valid_image_types = ['image/jpeg', 'image/png', 'image/gif']
            if profile_image.content_type not in valid_image_types:
                messages.error(request, 'Invalid file type. Please upload a JPEG, PNG, or GIF image.')
                return redirect('user_dashboard')
            if profile_image.size > 5 * 1024 * 1024:  # 5MB limit
                messages.error(request, 'File size exceeds 5MB. Please upload a smaller image.')
                return redirect('user_dashboard')

            # Delete old image if it exists
            if user.profile_image and default_storage.exists(user.profile_image.name):
                default_storage.delete(user.profile_image.name)

            # Save new image
            file_name = default_storage.save(f'profile_images/{user.id}/{profile_image.name}', profile_image)
            user.profile_image = file_name

        user.save()
        messages.success(request, "Profile updated successfully!")
        return redirect('user_dashboard')

    return redirect('user_dashboard')
def upload_profile_image(request):
    return JsonResponse({"message": "Upload profile image endpoint"})